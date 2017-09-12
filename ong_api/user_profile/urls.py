from django.conf.urls import url, include
from user_profile.views import *

urlpatterns = [
    url(r'profiles/$', ProfileList.as_view()),
    url(r'profiles/(?P<pk>\d+)/$', ProfileDetail.as_view()),
]
