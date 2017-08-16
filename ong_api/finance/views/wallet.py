from rest_framework import generics
from finance.models import Wallet
from finance.serializers import WalletSerializer

__all__ = [
    'WalletList',
    'WalletDetail',
]


class WalletList(generics.ListCreateAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer


class WalletDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def perform_destroy(self, instance):
        instance.disable()
