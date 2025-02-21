from django.contrib import admin

from .models import User, Member, Admin


class CustomUserAdmin(admin.ModelAdmin):
    # model = Member
    
    # Specify which fields to display
    list_display = ('username', 'email', 'is_active', 'is_staff',)

    # exclude = ('groups',)

    # You can add other customizations as needed
    search_fields = ('email', 'username',)

    ordering = ('username',)


class CustomAdmin(admin.ModelAdmin):
    # Specify which fields to display
    list_display = ('username', 'email', 'club_name', 'is_active', 'is_staff',)

    # exclude = ('groups',)

    # You can add other customizations as needed
    search_fields = ('email', 'username',)

    ordering = ('username',)

    #def model_attribute(self, obj):
        #obj represents an instance of uss model ka jike saath isko integrate kr rhe hn
    def club_name(self, obj):
        return obj.club.club_id #obj.club means club foreign_key se associate h in AdminClass, isaliye aisa likh pa rhe hn




# Register your models here.
# admin.site.register(Model, CustomModelAdmin)
# admin.site.register(User)
admin.site.register(Member, CustomUserAdmin)
admin.site.register(Admin, CustomUserAdmin)