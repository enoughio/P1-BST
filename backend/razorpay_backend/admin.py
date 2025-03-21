from django.contrib import admin

from .models import Transaction


class CustomTransactionAdmin(admin.ModelAdmin):
    list_display = ['payment_id', 'order_id', 'signature', 'amount']


admin.site.register(Transaction, CustomTransactionAdmin)
