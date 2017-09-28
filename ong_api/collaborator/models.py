from django.db import models
from core.models import Phone
from django.conf import settings
FEMALE = 1
MALE = 2

GENRES = (
    (FEMALE, 'Female'),
    (MALE, 'Male'),
)


class Collaborator(models.Model):
    user = models.OneToOneField('auth.User', related_name='collaborator')
    phones = models.ManyToManyField(Phone, related_name='collaborators')

    active = models.BooleanField(default=True)
    cpf = models.CharField(max_length=16)
    rg = models.CharField(max_length=12)
    birth_date = models.DateField()
    genre = models.CharField(max_length=2, choices=GENRES)

    cep = models.CharField(max_length=10)
    logradouro = models.CharField(max_length=255)
    complemento = models.CharField(max_length=128, blank=True, null=True)
    bairro = models.CharField(max_length=128)
    localidade = models.CharField(max_length=128)
    uf = models.CharField(max_length=8)

    class Meta:
        ordering = ['user__first_name', 'user__last_name']

    def __str__(self):
        return self.user.get_full_name() or self.user.username

    def enable(self):
        self.active = True
        self.save()

    def disable(self):
        self.active = False
        self.save()
