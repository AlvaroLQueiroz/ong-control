import datetime
import logging
from decimal import Decimal

from django.contrib.auth.models import User
from django.test import TestCase
from finance.models import Transaction, Wallet

logger = logging.Logger(__file__)


class TransactionTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='user1', password='123')
        cls.amount = 3
        cls.wallet = Wallet.objects.create(description='Wallet 1', label='Wallet1')

    def test_balance(self):
        amount_transactions = 5
        value_transaction = Decimal(5.0)
        for index in range(amount_transactions):
            Transaction.objects.create(wallet=self.wallet, done=True, due_date=datetime.datetime.today(), value=value_transaction)
        self.assertEqual(Transaction.objects.balance(), amount_transactions * value_transaction)

        transaction = Transaction.objects.first()
        transaction.mark_undone()
        self.assertEqual(Transaction.objects.balance(), amount_transactions * value_transaction - value_transaction)
