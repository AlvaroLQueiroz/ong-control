# -*- coding: utf-8 -*-
import logging
from django.contrib.auth.models import User

from collaborator.models import Collaborator
from core.models import Phone
from core.serializers import PhoneSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class CollaboratorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    phones = PhoneSerializer(many=True)

    class Meta:
        model = Collaborator
        fields = ('id', 'user', 'phones', 'cpf', 'rg', 'birth_date', 'genre', 'cep', 'logradouro',
                  'complemento', 'bairro', 'localidade', 'uf')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        phones_data = validated_data.pop('phones')
        user = User.objects.create(**user_data)
        collaborator = Collaborator.objects.create(user=user, **validated_data)
        for phone_data in phones_data:
            Phone.objects.create(collaborator=collaborator, **phone_data)

        return collaborator

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        phones_data = validated_data.pop('phones')
        for field, value in user_data.items():
            setattr(instance.user, field, value)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        try:
            instance.user.save()
            instance.save()
            # for phone_data in phones_data:
            #     phone = Phone.objects.update_or_create(
            #         collaborator=instance, **phone_data)
            #     if phone[1]:
            #         phone[0].save()
        except Exception as e:
            logging.warning(e)
            raise ValidationError(
                {'user': {'username': ['Esse nome de usuário já está em uso.']}}, code='invalid')
        return instance
