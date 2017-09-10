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
    balance = serializers.SerializerMethodField('calculate_balance')

    class Meta:
        model = TransactionCategory
        fields = ('id', 'active', 'description', 'label', 'needs_nf', 'transaction_type', 'balance')

    def calculate_balance(self, category):
        return category.balance()


class TransactionSerializer(serializers.ModelSerializer):
    category = TransactionCategorySerializer(read_only=True)
    wallet = WalletSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'active', 'description', 'done', 'due_date', 'value', 'category', 'wallet')

    def create(self, validated_data):
        category_data = self.initial_data.pop('category')
        wallet_data = self.initial_data.pop('wallet')
        category = TransactionCategory.objects.get(id=category_data['id'])
        wallet = Wallet.objects.get(id=wallet_data['id'])
        transaction = Transaction.objects.create(wallet=wallet, category=category, **validated_data)

        return transaction

    def update(self, instance, validated_data):
        category_data = self.initial_data.pop('category')
        wallet_data = self.initial_data.pop('wallet')
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.wallet_id = wallet_data['id']
        instance.category_id = category_data['id']
        instance.save()
        return instance


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
