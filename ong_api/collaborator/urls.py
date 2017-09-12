from django.conf.urls import url
from collaborator.views import *

urlpatterns = [
    url(r'collaborators/$', CollaboratorList.as_view()),
    url(r'collaborators/(?P<pk>\d+)/$', CollaboratorDetail.as_view()),
]
