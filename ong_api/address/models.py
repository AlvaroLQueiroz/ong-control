from django.db import models
from django.utils.translation import ugettext_lazy as _

from location.validators import validate_zipcode


class Country(models.Model):
    abbreviation = models.CharField(max_length=4)
    name = models.CharField(max_length=64)
    nationality = models.CharField(max_length=64)

    class Meta:
        ordering = ['name']
        verbose_name = _('Country')
        verbose_name_plural = _('Countries')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.abbreviation = self.abbreviation.upper()
        self.name = self.name.capitalize()
        self.nationality = self.nationality.capitalize()
        super(Country, self).save(*args, **kwargs)


class State(models.Model):
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name='states')

    abbreviation = models.CharField(max_length=4)
    name = models.CharField(max_length=64)

    class Meta:
        ordering = ['name']
        verbose_name = _('State')
        verbose_name_plural = _('States')

    def __str__(self):
        return '{name}, {country}'.format(
            name=self.name,
            country=self.country.abbreviation
        )

    def save(self, *args, **kwargs):
        self.abbreviation = self.abbreviation.upper()
        self.name = self.name.capitalize()
        super(State, self).save(*args, **kwargs)


class City(models.Model):
    state = models.ForeignKey(State, on_delete=models.PROTECT, related_name='cities')

    name = models.CharField(max_length=64)

    class Meta:
        ordering = ['name']
        verbose_name = _('City')
        verbose_name_plural = _('Cities')

    def __str__(self):
        return '{name} - {state}'.format(
            name=self.name,
            state=self.state
        )

    def save(self, *args, **kwargs):
        self.name = self.name.capitalize()
        super(City, self).save(*args, **kwargs)


class Neighborhood(models.Model):
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name='neighborhoods')

    name = models.CharField(max_length=64)

    class Meta:
        ordering = ['name']
        verbose_name = _('Neighborhood')
        verbose_name_plural = _('Neighborhoods')

    def __str__(self):
        return '{name}, {city}'.format(
            name=self.name,
            city=self.city.name,
        )

    def save(self, *args, **kwargs):
        self.name = self.name.capitalize()
        super(Neighborhood, self).save(*args, **kwargs)


class StreetKind(models.Model):
    name = models.CharField(max_length=32)
    abbreviation = models.CharField(max_length=8)

    class Meta:
        ordering = ['name']
        verbose_name = _('Street kind')
        verbose_name_plural = _('Streets kinds')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = self.name.capitalize()
        self.abbreviation = self.language_abbreviation.title()
        if self.abbreviation[-1] != '.':
            self.abbreviation += '.'
        super(StreetKind, self).save(*args, **kwargs)


class ZipCode(models.model):
    kind = models.ForeignKey(StreetKind, on_delete=models.PROTECT, related_name='zipcodes')
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name='zipcodes')
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.PROTECT, related_name='zipcodes', null=True, blank=True)

    number = models.CharField(max_length=10, validators=[validate_zipcode], verbose_name="C.E.P.")
    street = models.CharField(max_length=128)

    class Meta:
        ordering = ['number']
        verbose_name = _('ZIP Code')
        verbose_name_plural = _('Zip Code')

    def __str__(self):
        return '{cep} - {kind} {street}, {neighborhood} - {city}'.format(
            kind=self.kind,
            street=self.street,
            number=self.number,
            complement=self.complement + ', ' if self.complement else '',
            neighborhood=self.neighborhood.name,
            cep=self.cep,
            city=self.neighborhood.city
        )

    def save(self, *args, **kwargs):
        self.street = self.name.title()
        super(ZipCode, self).save(*args, **kwargs)


class Address(models.Model):
    zipcode = models.ForeignKey(ZipCode, on_delete=models.PROTECT, related_name='addresses')

    number = models.IntegerField()
    complement = models.CharField(max_length=128, null=True, blank=True)

    class Meta:
        ordering = ['zipcode__neighborhood__city__state__county__name', 'zipcode__neighborhood__city__state__name', 'zipcode__neighborhood__city__name', 'zipcode__neighborhood__name', 'zipcode__kind__name', 'zipcode__street', 'number']
        verbose_name_plural = _('Address')
        verbose_name_plural = _('Adresses')

    def __str__(self):
        return '{kind} {street}, {number}, {complement}{neighborhood} - {cep} - {city}'.format(
            kind=self.kind,
            street=self.street,
            number=self.number,
            complement=self.complement + ', ' if self.complement else '',
            neighborhood=self.neighborhood.name,
            cep=self.cep,
            city=self.neighborhood.city
        )

    def save(self, *args, **kwargs):
        self.complement = self.complement.title()
        super(Address, self).save(*args, **kwargs)
