from rest_framework import generics
from collaborator.models import Collaborator
from collaborator.serializers import CollaboratorSerializer

__all__ = [
    'CollaboratorList',
    'CollaboratorDetail',
]


class CollaboratorList(generics.ListCreateAPIView):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer


class CollaboratorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collaborator.objects.all()
    serializer_class = CollaboratorSerializer

    def perform_destroy(self, instance):
        instance.disable()
