import logging
from django.views.generic.base import TemplateView
from django.contrib.auth.models import Group
from core.models import TelephoneCompany
from core.serializers import UserSerializer, TelephoneCompanySerializer, GroupSerializer
from rest_framework import generics, parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from user_profile.serializers import ProfileSerializer
from collaborator.serializers import CollaboratorSerializer

__all__ = [
    'Login',
    'Logout',
    'TelephoneCompanyList',
    'TelephoneCompanyDetail',
    'GroupList',
    'GroupDetail',
]


class Login(APIView):
    throttle_classes = ()
    permission_classes = ()
    authentication_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if hasattr(user, 'profile'):
            return Response(ProfileSerializer(user.profile).data)
        if hasattr(user, 'collaborator'):
            return Response(CollaboratorSerializer(user.collaborator).data)
        else:
            return Response(UserSerializer(user).data)


class Logout(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


class TelephoneCompanyList(generics.ListCreateAPIView):
    queryset = TelephoneCompany.objects.all()
    serializer_class = TelephoneCompanySerializer


class TelephoneCompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TelephoneCompany.objects.all()
    serializer_class = TelephoneCompanySerializer


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
