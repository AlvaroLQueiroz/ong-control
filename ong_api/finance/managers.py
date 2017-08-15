from django.db import models
from django.db.models import Case, F, Sum, When

from finance import TRANSACTION_INPUT, TRANSACTION_OUTPUT

class WalletManager(models.Manager):
    def actives(self):
        return self.get_queryset().filter(active=True)

    def inactives(self):
        return self.get_queryset().filter(active=False)


class TransactionManager(models.Manager):
    def balance(self):
        return self.get_queryset().aggregate(
            total=Sum(
                Case(
                    When(active=True, category__transaction_type=TRANSACTION_INPUT, done=True, then=F('value')),
                    When(active=True, category__transaction_type=TRANSACTION_OUTPUT, done=True, then=F('value') * -1)
                )
            )
        )['total']
