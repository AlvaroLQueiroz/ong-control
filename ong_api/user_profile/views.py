from rest_framework import generics
from user_profile.models import Profile
from user_profile.serializers import ProfileSerializer

__all__ = [
    'ProfileList',
    'ProfileDetail',
]


class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
