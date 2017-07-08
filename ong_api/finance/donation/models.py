from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import ugettext as _
from finance.core.models import Transaction
from .managers import DonationManager
__all__ = [
    'Donation',
]

class Donation(models.Model):
    person = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='donations')
    transaction = models.OneToOneField(Transaction, on_delete=models.PROTECT, related_name='donations')

    objects = DonationManager()

    class Meta:
        verbose_name = _('donation')
        verbose_name_plural = _('donations')
        ordering = ['person__first_name']
