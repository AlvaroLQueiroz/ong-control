# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-28 00:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collaborator', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collaborator',
            name='complemento',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]