from django.db import models
from core.models import Phone
from core import GENRES


class Profile(models.Model):
    user = models.OneToOneField('auth.User', verbose_name='usuário')
    phones = models.ManyToManyField(Phone, related_name='phones')
    guardians = models.ManyToManyField('auth.User', related_name='protecteds', null=True, blank=True)

    active = models.BooleanField(default=True)
    cpf = models.CharField(max_length=16)
    rg = models.CharField(max_length=12)
    birth_date = models.DateField()
    genre = models.CharField(max_length=2, choices=GENRES)

    cep = models.CharField(max_length=10)
    logradouro = models.CharField(max_length=255)
    complemento = models.CharField(max_length=128)
    bairro = models.CharField(max_length=128)
    localidade = models.CharField(max_length=128)
    uf = models.CharField(max_length=8)
