# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-09-28 00:16
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=16)),
            ],
            options={
                'ordering': ['company__name', 'number'],
            },
        ),
        migrations.CreateModel(
            name='TelephoneCompany',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, verbose_name='nome')),
            ],
            options={
                'verbose_name': 'Operadora de telefonia',
                'verbose_name_plural': 'Operadoras de telefonia',
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='phone',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phones', to='core.TelephoneCompany'),
        ),
    ]
