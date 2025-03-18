from django.contrib import admin

from bst.models import (club, project, meeting, event, event_registration, award, membership)

class CustomAdminProject(admin.ModelAdmin):
    list_display = ('project_id', 'title',)


class CustomAdminClub(admin.ModelAdmin):
    list_display = ('club_id', 'club_name', 'city', 'state', 'postal_code',)


class CustomAdminMembership(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'duration_in_months')


# Register your models here.
admin.site.register(club.Club, CustomAdminClub)
admin.site.register(project.Project, CustomAdminProject)
admin.site.register(meeting.Meeting)
admin.site.register(event.Event)

admin.site.register(membership.Membership, CustomAdminMembership)
# admin.site.register(event_registration.EventRegistration)
# admin.site.register(award.Award)