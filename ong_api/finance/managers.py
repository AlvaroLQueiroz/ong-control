from django.db import models
from django.db.models import Case, F, Sum, When

from finance import TRANSACTION_INPUT, TRANSACTION_OUTPUT

class WalletManager(models.Manager):
    def actives(self):
        return self.get_queryset().filter(active=True)

    def inactives(self):
        return self.get_queryset().filter(active=False)
