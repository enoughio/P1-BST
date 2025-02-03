from django.contrib import admin

from .models import User



class CustomUserAdmin(admin.ModelAdmin):
    model = User
    
    # Specify which fields to display
    list_display = ('username', 'email', 'is_active', 'is_staff',)

    # exclude = ('groups',)

    # You can add other customizations as needed
    search_fields = ('email', 'username',)

    ordering = ('username',)



# Register your models here.
# admin.site.register(Model, CustomModelAdmin)
admin.site.register(User, CustomUserAdmin)