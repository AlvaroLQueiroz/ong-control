from django.conf.urls import url, include
from django.contrib import admin
# from rest_framework.authtoken import views

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/', include('finance.urls', namespace='finance')),
    url(r'^api/', include('collaborator.urls', namespace='collaborator')),
    url(r'^api/', include('user_profile.urls', namespace='profile')),
    url(r'^', include('core.urls', namespace='core')),
]
