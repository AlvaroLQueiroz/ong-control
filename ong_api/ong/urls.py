from django.conf.urls import url, include
from django.contrib import admin
# from rest_framework.authtoken import views
from core.views import Login

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/api-token-auth/', Login.as_view()),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api', include('finance.urls', namespace='finance')),
    url(r'^api', include('collaborator.urls', namespace='collaborator')),
]
