from core.serializers import PhoneSerializer, UserSerializer
from rest_framework import serializers
from user_profile.models import Profile
from django.contrib.auth.models import User
from core.models import Phone


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    phones = PhoneSerializer(many=True)
    guardians = UserSerializer(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'phones', 'guardians', 'active', 'cpf', 'rg', 'birth_date',
                  'genre', 'cep', 'logradouro', 'complemento', 'bairro', 'localidade', 'uf')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        phones_data = validated_data.pop('phones')
        guardians_data = validated_data.pop('guardians')

        user = User.objects.create(**user_data)
        profile = Profile.objects.create(user=user, **validated_data)
        for guardian_data in guardians_data:
            guardian = User.objects.get_or_create(**guardian_data)[0]
            guardian.save()
            profile.guardians.add(guardian)
        for phone_data in phones_data:
            phone = Phone.objects.create(**phone_data)
            profile.phones.add(phone)

        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        phones_data = validated_data.pop('phones')
        guardians_data = validated_data.pop('guardians')

        for field, value in user_data.items():
            setattr(instance.user, field, value)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        for guardian_data in guardians_data:
            guardian = User.objects.get_or_create(**guardian_data)[0]
            guardian.save()
            instance.guardians.add(guardian)
        for phone_data in phones_data:
            phone = Phone.objects.get_or_create(**phone_data)[0]
            phone.save()
            instance.phones.add(phone)
        instance.save()
        return instance
