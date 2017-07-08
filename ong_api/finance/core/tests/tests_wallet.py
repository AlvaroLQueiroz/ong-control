import datetime
import logging

from django.test import TestCase
from django.contrib.auth.models import User

from finance.core.models import Wallet

logger = logging.Logger(__file__)


class DonationTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', password='123')
        cls.wallet1 = Wallet.objects.create(user=cls.user, description='Wallet 1', label='Wallet1')
        cls.wallet2 = Wallet.objects.create(user=cls.user, description='Wallet 2', label='Wallet2')

    def test_active(self):
        self.assertEqual(Wallet.objects.count(), 2)
        w = Wallet.objects.first()
        w.active = False
        w.save()
        self.assertEqual(Wallet.objects.filter(active=True).count(), 1)
