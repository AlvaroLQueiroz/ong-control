import datetime
import logging

from django.test import TestCase
from django.contrib.auth.models import User

from finance.core.models import Transaction, Wallet
from finance.donation.models import Donation

logger = logging.Logger(__file__)

class DonationTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', password='123')
        cls.wallet = Wallet.objects.create(user=cls.user, description='Wallet 1', label='Wallet1')
