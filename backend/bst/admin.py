from django.contrib import admin

from bst.models import (club, project, meeting, event, event_registration, award, membership, membership_history, executive_committee)

class CustomAdminProject(admin.ModelAdmin):
    list_display = ('project_id', 'title',)


class CustomAdminClub(admin.ModelAdmin):
    list_display = ('club_id', 'club_name', 'city', 'state', 'postal_code',)

class CustomAdminInitiative(admin.ModelAdmin):
    list_display = ('title', 'eligible_age', 'max_club_size',)


class CustomAdminEvent(admin.ModelAdmin):
    list_display = ('event_id', 'title', 'club', 'date', 'fee')


class CustomAdminMembership(admin.ModelAdmin):
    list_display = ('id', 'name', 'fee', 'duration_in_months')

class CustomAdminMembershipHistory(admin.ModelAdmin):
    list_display = ('member', 'membership_type', 'start_date', 'end_date')


# Register your models here.
admin.site.register(club.Club, CustomAdminClub)
admin.site.register(club.Initiative, CustomAdminInitiative)
admin.site.register(project.Project, CustomAdminProject)
admin.site.register(meeting.Meeting)
admin.site.register(event.Event, CustomAdminEvent)

admin.site.register(membership.Membership, CustomAdminMembership)
admin.site.register(membership_history.MembershipHistory, CustomAdminMembershipHistory)
# admin.site.register(event_registration.EventRegistration)
# admin.site.register(award.Award)

admin.site.register(executive_committee.ExecutiveCommittee)
admin.site.register(project.ProjectHistory)
admin.site.register(award.Award)