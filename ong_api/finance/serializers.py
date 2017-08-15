from rest_framework import serializers

from .models import Transaction, Wallet


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ('id', 'user', 'active', 'created', 'description', 'label')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'user', 'active', 'created', 'due_date', 'is_entry', 'value')


class WalletRelatedSerializer(serializers.ModelSerializer):
    transactions = TransactionSerializer(many=True)

    class Meta:
        model = Wallet
        fields = ('id', 'user', 'active', 'created', 'description', 'label', 'transactions')


class TransactionRelatedSerializer(serializers.ModelSerializer):
    wallet = WalletSerializer()

    class Meta:
        model = Transaction
        fields = ('id', 'user', 'wallet', 'active', 'created', 'due_date', 'is_entry', 'value')
