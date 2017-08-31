from django.conf.urls import url, include
from django.contrib import admin
# from rest_framework.authtoken import views
from core.views import Login

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', Login.as_view()),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include('finance.urls', namespace='finance')),
]
