from django.db import models


class DonationManager(models.Manager):
    def donated(self):
        return super(DonationManager, self).get_queryset().filter(transaction__is_entry=False)

    def received(self):
        return super(DonationManager, self).get_queryset().filter(transaction__is_entry=True)
