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
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('done', models.BooleanField(default=False)),
                ('due_date', models.DateField()),
                ('value', models.DecimalField(decimal_places=2, max_digits=20)),
                ('operation_number', models.CharField(max_length=32)),
            ],
            options={
                'verbose_name': 'transaction',
                'verbose_name_plural': 'transactions',
                'ordering': ['due_date'],
            },
        ),
        migrations.CreateModel(
            name='TransactionCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('label', models.CharField(max_length=256)),
                ('needs_nf', models.BooleanField(default=True)),
                ('transaction_type', models.PositiveSmallIntegerField(choices=[(1, 'Input'), (2, 'Output')])),
            ],
            options={
                'verbose_name': 'transaction category',
                'verbose_name_plural': 'transaction categories',
                'ordering': ['label'],
            },
        ),
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('agency', models.CharField(blank=True, max_length=128, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('label', models.CharField(max_length=128, unique=True)),
                ('number', models.CharField(blank=True, max_length=128, null=True)),
            ],
            options={
                'verbose_name': 'wallet',
                'verbose_name_plural': 'wallets',
                'ordering': ['label', 'agency', 'number'],
            },
        ),
        migrations.AddField(
            model_name='transaction',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='transactions', to='finance.TransactionCategory'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='wallet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='transactions', to='finance.Wallet'),
        ),
    ]
