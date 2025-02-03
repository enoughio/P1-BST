from django.contrib import admin

from bst.models import (club, club_admin, project)

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
        return obj.club.club_id


class CustomAdminProject(admin.ModelAdmin):
    list_display = ('project_id', 'title', 'created_at',)


class CustomAdminClub(admin.ModelAdmin):
    list_display = ('club_name', 'city', 'state', 'postal_code',)


# Register your models here.
admin.site.register(club_admin.Admin, CustomAdmin)
admin.site.register(club.Club, CustomAdminClub)
admin.site.register(project.Project, CustomAdminProject)