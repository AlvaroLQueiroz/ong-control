from django.db import models


class TelephoneCompany(models.Model):
    '''
        A telephone company, also known as a telco, telephone service provider or telecommunications operator,
        is a kind of communications service provider that provides telecommunications services such as telephony
        and data communications access.
    '''
    name = models.CharField(max_length=64, verbose_name='nome')
    # brand = models.ImageField(null=True, blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Operadora de telefonia'
        verbose_name_plural = 'Operadoras de telefonia'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        pass


class Phone(models.Model):
    company = models.ForeignKey(TelephoneCompany, related_name='phones')
    number = models.CharField(max_length=16)

    class Meta:
        ordering = ['company__name', 'number']

    def __str__(self):
        return '{number} ({company})'.format(number=self.number, company=self.company)
