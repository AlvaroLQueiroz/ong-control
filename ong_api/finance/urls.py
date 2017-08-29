from django.conf.urls import url, include
from finance.views import *

urlpatterns = [
    url(r'wallets/$', WalletList.as_view()),
    url(r'wallets/(?P<pk>\d+)/$', WalletDetail.as_view()),

    url(r'transactions/$', TransactionList.as_view()),
    url(r'transactions/add/$', TransactionCreate.as_view()),
    url(r'transactions/(?P<pk>\d+)/$', TransactionRetrieve.as_view()),
    url(r'transactions/(?P<pk>\d+)/delete/$', TransactionDestroy.as_view()),
    url(r'transactions/(?P<pk>\d+)/update/$', TransactionUpdate.as_view()),
    url(r'transactions/wallet/(?P<pk>\d+)/$', WalletTransactionList.as_view()),
    url(r'transactions/category/(?P<pk>\d+)/$', CategoryTransactionList.as_view()),

    url(r'transaction-category/$', TransactionCategoryList.as_view()),
    url(r'transaction-category/(?P<pk>\d+)/$', TransactionCategoryDetail.as_view()),
]
