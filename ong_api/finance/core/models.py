from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext as _

__all__ = [
    'Transaction',
    'Wallet',
]

class Wallet(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='wallets')

    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    label = models.CharField(max_length=256)

    class Meta:
        verbose_name = _('wallet')
        verbose_name_plural = _('wallets')
        ordering = ['label']

    def __str__(self):
        return self.name


class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='transactions')
    wallet = models.ForeignKey(Wallet, on_delete=models.PROTECT, related_name='transactions')

    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField()
    is_entry = models.BooleanField(default=True)
    value = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        verbose_name = _('transaction')
        verbose_name_plural = _('transactions')
        ordering = ['due_date', 'is_entry']
