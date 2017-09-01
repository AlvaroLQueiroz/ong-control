from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator

from core.models import Phone, PhoneOperator
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


class PhoneOperatorSerialize(serializers.ModelSerializer):
    class Meta:
        model = PhoneOperator
        fields = ('id', 'label')


class PhoneSerializer(serializers.ModelSerializer):
    operator = PhoneOperatorSerialize()

    class Meta:
        model = Phone
        fields = ['id', 'number', 'operator']

    def create(self, validated_data):
        operator_data = validated_data.pop('operator')
        operator = PhoneOperator.objects.create(**operator_data)
        phone = Phone.objects.create(
            operator=operator, **validated_data)
        return phone
