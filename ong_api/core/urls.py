from django.conf.urls import url, include
from core.views import *

urlpatterns = [
    url(r'^api/api-token-auth/', Login.as_view()),

    url(r'^api/telephony-company/', TelephoneCompanyList.as_view()),
    url(r'^api/telephony-company/(?P<pk>\d+)/', TelephoneCompanyDetail.as_view()),
    url(r'^api/groups/', GroupList.as_view()),
    url(r'^api/groups/(?P<pk>\d+)/', GroupDetail.as_view()),
]
