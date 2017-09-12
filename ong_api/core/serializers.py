from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator

from core.models import Phone, TelephoneCompany
from rest_framework import serializers


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


class TelephoneCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = TelephoneCompany
        fields = ('id', 'label', 'brand')


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
