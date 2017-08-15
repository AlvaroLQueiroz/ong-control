from django.contrib import admin
from finance.models import Transaction, TransactionCategory, Wallet


admin.site.register(Transaction)
admin.site.register(TransactionCategory)
admin.site.register(Wallet)
