from rest_framework import generics
from finance.models import Transaction
from finance.serializers import TransactionSerializer

__all__ = [
    'TransactionList',
    'TransactionDetail',
    'WalletTransactionList',
]


class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_destroy(self, instance):
        instance.disable()

class WalletTransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
