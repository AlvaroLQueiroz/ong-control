from django.conf.urls import url, include
from core.views import *

urlpatterns = [
    url(r'^api/api-token-auth/', Login.as_view()),
]
