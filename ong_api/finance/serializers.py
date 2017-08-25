from rest_framework import serializers

from .models import Transaction, TransactionCategory, Wallet


class WalletSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField('calculate_balance')

    class Meta:
        model = Wallet
        fields = ('id', 'active', 'agency', 'description', 'label', 'number', 'balance')

    def calculate_balance(self, wallet):
        return wallet.balance()

class TransactionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = ('id', 'active', 'description', 'label', 'needs_nf', 'transaction_type')


class TransactionSerializer(serializers.ModelSerializer):
    category = TransactionCategorySerializer()
    wallet = WalletSerializer()
    class Meta:
        model = Transaction
        fields = ('id', 'active', 'description', 'done', 'due_date', 'value', 'category', 'wallet')


class WalletRelatedSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True)

    class Meta:
        model = Wallet
        fields = ('id', 'active', 'agency', 'description', 'label', 'number', 'transactions')


class TransactionCategoryRelatedSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True)

    class Meta:
        model = TransactionCategory
        fields = ('id', 'active', 'description', 'label', 'needs_nf', 'transaction_type', 'transactions')


class TransactionRelatedSerializer(serializers.ModelSerializer):
    category = TransactionCategorySerializer()
    wallet = WalletSerializer()

    class Meta:
        model = Transaction
        fields = ('id', 'active', 'description', 'done', 'due_date', 'value', 'category', 'wallet')
