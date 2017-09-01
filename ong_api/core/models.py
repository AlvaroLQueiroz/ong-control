from django.db import models


class PhoneOperator(models.Model):
    label = models.CharField(max_length=32)

    class Meta:
        ordering = ['label']

    def __str__(self):
        return self.label


class Phone(models.Model):
    operator = models.ForeignKey(PhoneOperator, related_name='phones')
    number = models.CharField(max_length=16)

    class Meta:
        ordering = ['operator__label', 'number']

    def __str__(self):
        return '{number} ({operator})'.format(number=self.number, operator=self.operator)
