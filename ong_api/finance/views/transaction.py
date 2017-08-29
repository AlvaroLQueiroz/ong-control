from rest_framework import generics
from finance.models import Transaction
from finance.serializers import TransactionSerializer, TransactionRelatedSerializer

__all__ = [
    'TransactionCreate',
    'TransactionList',
    'TransactionRetrieve',
    'TransactionDestroy',
    'TransactionUpdate',
    'WalletTransactionList',
    'CategoryTransactionList',
]

class TransactionCreate(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionList(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionRelatedSerializer

class TransactionRetrieve(generics.RetrieveAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDestroy(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_destroy(self, instance):
        instance.disable()

class TransactionUpdate(generics.UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class WalletTransactionList(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionRelatedSerializer

    def get_queryset(self, *args, **kwargs):
        return super(WalletTransactionList, self).get_queryset(*args, **kwargs).filter(wallet=self.kwargs.get('pk'))

class CategoryTransactionList(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionRelatedSerializer

    def get_queryset(self, *args, **kwargs):
        return super(CategoryTransactionList, self).get_queryset(*args, **kwargs).filter(category=self.kwargs.get('pk'))
