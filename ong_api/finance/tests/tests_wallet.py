import datetime
import logging

from django.test import TestCase
from django.contrib.auth.models import User

from finance.models import Wallet

logger = logging.Logger(__file__)


class WalletTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', password='123')
        cls.amount = 3
        for counter in range(cls.amount):
            Wallet.objects.create(creator=cls.user, description='Wallet %d' % counter, label='Wallet%d' % counter)

    def test_status(self):
        self.assertEqual(Wallet.objects.count(), self.amount)
        w = Wallet.objects.first()
        w.disable()
        self.assertEqual(Wallet.objects.actives().count(), self.amount - 1)
        self.assertEqual(Wallet.objects.inactives().count(), 1)
        w.enable()
        self.assertEqual(Wallet.objects.actives().count(), self.amount)
