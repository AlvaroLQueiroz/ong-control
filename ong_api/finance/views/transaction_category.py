from rest_framework import generics
from finance.models import TransactionCategory
from finance.serializers import TransactionCategorySerializer

__all__ = [
    'TransactionCategoryList',
    'TransactionCategoryDetail',
]


class TransactionCategoryList(generics.ListCreateAPIView):
    queryset = TransactionCategory.objects.all()
    serializer_class = TransactionCategorySerializer


class TransactionCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TransactionCategory.objects.all()
    serializer_class = TransactionCategorySerializer

    def perform_destroy(self, instance):
        instance.disable()
