from django.conf.urls import url, include
from core.views import *

urlpatterns = [
    url(r'^api-token-auth/', Login.as_view()),

    url(r'^telephony-company/', TelephoneCompanyList.as_view()),
    url(r'^telephony-company/(?P<pk>\d+)/', TelephoneCompanyDetail.as_view()),
    url(r'^groups/', GroupList.as_view()),
    url(r'^groups/(?P<pk>\d+)/', GroupDetail.as_view()),
]
