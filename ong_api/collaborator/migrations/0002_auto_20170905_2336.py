# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-05 23:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collaborator', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collaborator',
            name='genre',
            field=models.CharField(choices=[(1, 'Female'), (2, 'Male')], max_length=2),
        ),
    ]