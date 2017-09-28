import logging
from django.contrib.auth.models import User, Group
from django.contrib.auth.validators import UnicodeUsernameValidator

from core.models import Phone, TelephoneCompany
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class UserSerializer(serializers.ModelSerializer):
    auth_token = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = ('id', 'username', 'is_active', 'first_name',
                  'last_name', 'email', 'auth_token')
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()]
            }
        }

    #     def create(self, validated_data):
    #         groups_data = validated_data.pop('groups')
    #         token = validated_data.pop('auth_token')
    #         user = User.objects.create(**validated_data)
    #         for group_data in groups_data:
    #             logging.warning(group_data)
    #             group = Group.objects.get_or_create(**group_data)[0]
    #             group.save()
    #             user.groups.add(group)
    #         return user

    # def update(self, instance, validated_data):
    #     groups_data = validated_data.pop('groups')
    #     token = validated_data.pop('auth_token')
    #     for field, value in validated_data.items():
    #         setattr(instance, field, value)
    #     for group_data in groups_data:
    #         group = Group.objects.get_or_create(**group_data)[0]
    #         group.save()
    #         instance.groups.add(group)
    #     instance.save()
    #     return instance


class TelephoneCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = TelephoneCompany
        fields = ('id', 'name')


class PhoneSerializer(serializers.ModelSerializer):
    company = TelephoneCompanySerializer()

    class Meta:
        model = Phone
        fields = ['id', 'number', 'company']

    def create(self, validated_data):
        company_data = validated_data.pop('company')
        company = TelephoneCompany.objects.create(**company_data)
        phone = Phone.objects.create(
            operator=company, **validated_data)
        return phone
