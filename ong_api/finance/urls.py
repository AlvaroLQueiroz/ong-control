from django.conf.urls import url, include
from finance.views import *

urlpatterns = [
    url(r'wallets/$', WalletList.as_view()),
    url(r'wallets/(?P<pk>\d+)/$', WalletDetail.as_view()),
]
