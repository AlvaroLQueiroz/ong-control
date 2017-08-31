import datetime
from decimal import Decimal

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models import Case, F, Sum, When, DecimalField
from django.utils.translation import ugettext as _
from finance import TRANSACTION_INPUT, TRANSACTION_OUTPUT
from finance.managers import WalletManager

__all__ = [
    'TransactionCategory',
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
    description = models.TextField(null=True, blank=True)
    label = models.CharField(max_length=256, unique=True)
    number = models.CharField(max_length=256, null=True, blank=True)

    objects = WalletManager()

    class Meta:
        verbose_name = _('wallet')
        verbose_name_plural = _('wallets')
        ordering = ['label', 'agency', 'number']

    def __str__(self):
        return self.label

    def balance(self):
        return self.transactions.aggregate(
            total=Sum(
                Case(
                    When(active=True, category__transaction_type=TRANSACTION_INPUT, done=True, then=F('value')),
                    When(active=True, category__transaction_type=TRANSACTION_OUTPUT, done=True, then=-1 * F('value')),
                    output_field=DecimalField()
                )
            )
        )['total'] or Decimal('0.0')

    def enable(self):
        self.active = True
        self.save()

    def disable(self):
        self.active = False
        self.save()


class TransactionCategory(models.Model):
    active = models.BooleanField(default=True)
    description = models.TextField(null=True, blank=True)
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

    def balance(self):
        return self.transactions.aggregate(
            total=Sum(
                Case(
                    When(active=True, category__transaction_type=TRANSACTION_INPUT, done=True, then=F('value')),
                    When(active=True, category__transaction_type=TRANSACTION_OUTPUT, done=True, then=-1 * F('value')),
                    output_field=DecimalField()
                )
            )
        )['total'] or Decimal('0.0')


class Transaction(models.Model):
    category = models.ForeignKey(TransactionCategory, on_delete=models.PROTECT, related_name='transactions')
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, related_name='transactions')

    active = models.BooleanField(default=True)
    description = models.TextField(null=True, blank=True)
    done = models.BooleanField(default=False)
    due_date = models.DateField()
    value = models.DecimalField(max_digits=20, decimal_places=2)
    # favored = models.ForeignKey(Provider, related_name='transactions')

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
