from rest_framework import generics
from finance.models import Transaction
from finance.serializers import TransactionSerializer
from rest_framework.views import APIView
from rest_framework_csv import renderers as r
from datetime import datetime
from django.http import HttpResponse
import csv

__all__ = [
    'TransactionList',
    'TransactionDetail',
    'WalletTransactionList',
    'CategoryTransactionList',
    'TransactionToCsv',
]


class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_destroy(self, instance):
        instance.disable()


class WalletTransactionList(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self, *args, **kwargs):
        return super(WalletTransactionList, self).get_queryset(*args, **kwargs).filter(wallet=self.kwargs.get('pk'))


class CategoryTransactionList(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self, *args, **kwargs):
        return super(CategoryTransactionList, self).get_queryset(*args, **kwargs).filter(category=self.kwargs.get('pk'))


class TransactionToCsv(APIView):

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="Transações-{date}"'.format(date=datetime.today().strftime('%d-%m-%Y'))

        transactions = Transaction.objects.all()
        if request.GET.get('wallet_id'):
            transactions = transactions.filter(wallet=request.GET.get('wallet_id'))
        if request.GET.get('category_id'):
            transactions = transactions.filter(category=request.GET.get('category_id'))
        transactions = transactions.values_list('wallet__label', 'category__label', 'due_date', 'value', 'done')

        writer = csv.writer(response)
        for transaction in transactions:
            writer.writerow(transaction)

        return response
