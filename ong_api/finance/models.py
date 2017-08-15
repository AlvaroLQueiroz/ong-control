import datetime

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext as _

from finance import TRANSACTION_INPUT, TRANSACTION_OUTPUT
from finance.managers import TransactionManager, WalletManager

__all__ = [
    'PeriodicTransaction',
    'Transaction',
    'Wallet',
]

TRANSACTION_TYPE = (
    (TRANSACTION_INPUT, _('Input')),
    (TRANSACTION_OUTPUT, _('Output'))
)

class Wallet(models.Model):
    active = models.BooleanField(default=True)
    agency = models.CharField(max_length=256, null=True, blank=True)
    description = models.TextField()
    label = models.CharField(max_length=256, unique=True)
    number = models.CharField(max_length=256, null=True, blank=True)

    objects = WalletManager()

    class Meta:
        verbose_name = _('wallet')
        verbose_name_plural = _('wallets')
        ordering = ['label', 'agency', 'number']
        unique_together = (('agency', 'number'),)

    def __str__(self):
        return self.name

    def enable(self):
        self.active = True
        self.save()

    def disable(self):
        self.active = False
        self.save()


class TransactionCategory(models.Model):
    active = models.BooleanField(default=True)
    description = models.TextField()
    label = models.CharField(max_length=256)
    needs_nf = models.BooleanField(default=True)
    transaction_type = models.PositiveSmallIntegerField(choices=TRANSACTION_TYPE)

    class Meta:
        verbose_name = _('transaction category')
        verbose_name_plural = _('transaction categories')
        ordering = ['label']

    def __str__(self):
        return self.label

    def enable(self):
        self.active = True
        self.save()

    def disable(self):
        self.active = False
        self.save()


class PeriodicTransaction(models.Model):
    category = models.ForeignKey(TransactionCategory, on_delete=models.PROTECT, related_name='periodic_transactions')
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, related_name='periodic_transactions')

    active = models.BooleanField(default=True)
    cycle = models.PositiveSmallIntegerField(null=True, blank=True, default=0)
    delta = models.DurationField()
    end_date = models.DateField(null=True, blank=True)
    is_entry = models.BooleanField(default=True)
    start_date = models.DateField(default=datetime.date.today)
    value = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        verbose_name = _('periodic transaction')
        verbose_name_plural = _('periodic transactions')
        ordering = ['is_entry']

    def save(self, *args, **kwargs):
        if self.cycles != 0:
            self.end_date = self.start_date + (self.delta * self.cycles)
        if self.end_date:
            end_date = self.end_date
        else:
            end_date = datetime.date.today().replace(month=12, day=31)
        date = self.start_date

        while date <= end_date:
            transactions = []
            transactions.append(Transaction(
                creator=self.creator,
                periodicity=self,
                wallet=self.wallet,
                due_date=date,
                is_entry=self.is_entry,
                value=self.value
            ))

            Transaction.objects.bulk_create(transactions)
        return super(PeriodicTransaction, self).save(*args, **kwargs)

    def cancel(self):
        self.active = False
        self.save()
        self.transactions.update(active=False)

    def restore(self):
        self.active = True
        self.save()
        self.transactions.update(active=True)


class Transaction(models.Model):
    periodicity = models.ForeignKey(PeriodicTransaction, null=True, blank=True, on_delete=models.PROTECT, related_name='transactions')
    category = models.ForeignKey(TransactionCategory, on_delete=models.PROTECT, related_name='transactions')
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, related_name='transactions')

    active = models.BooleanField(default=True)
    done = models.BooleanField(default=False)
    due_date = models.DateField()
    value = models.DecimalField(max_digits=20, decimal_places=2)

    objects = TransactionManager()

    class Meta:
        verbose_name = _('transaction')
        verbose_name_plural = _('transactions')
        ordering = ['due_date']

    def cancel(self):
        self.active = False
        self.save()

    def restore(self):
        self.active = True
        self.save()

    def mark_done(self):
        self.done = True
        self.save()

    def mark_undone(self):
        self.done = False
        self.save()
