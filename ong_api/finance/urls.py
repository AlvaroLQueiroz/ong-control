from django.conf.urls import url, include
from finance.views import *

urlpatterns = [
    url(r'wallets/$', WalletList.as_view()),
    url(r'wallets/(?P<pk>\d+)/$', WalletDetail.as_view()),

    url(r'transactions/$', TransactionList.as_view()),
    url(r'transactions/(?P<pk>\d+)/$', TransactionDetail.as_view()),
    url(r'transactions/wallet/(?P<pk>\d+)/$', WalletTransactionList.as_view()),

    url(r'transaction-categories/$', TransactionCategoryList.as_view()),
    url(r'transactions-categories/(?P<pk>\d+)/$', TransactionCategoryDetail.as_view()),
]
