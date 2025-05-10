from django.urls import path

from .views import (
    # Club Views
    ClubCreateAPIView, ClubListAPIView, ClubRetrieveUpdateDestroyAPIView,

    # Event Views
    EventListCreateAPIView, EventListAPIView, EventRetrieveUpdateDestroyAPIView,
    EventRegisterAPIView,

    # Project Views
    ProjectAPIView, ProjectRetrieveUpdateAPIView,

    # Membership Views
    MembershipAPIView, 
    # MembershipActivateAPIView, MembershipHistoryListAPIView,

    # Member Views
    MembersByClubAPIView,

    # Award Views
    AwardAPIView,

    # Meeting Views
    MeetingCreateAPIView,
    MeetingListAPIView, 
    WeeklyMeetingListAPIView, WeeklyMeetingRetrieveUpdateDestroyAPIView, 
    ExecutiveCommitteeMeetingListAPIView, ExecutiveCommitteeMeetingRetrieveUpdateDestroyAPIView,

    ExecutiveCommitteeCreateAPIView,
    ExecutiveCommitteeRetrieveUpdateDestroyAPIViewAPIView,


    # Initiative View
    InitiativeCreateAPIView,
    InitiativeListAPIView,
    InitiativeRetrieveUpdateDestroyAPIViewAPIView,


    # CreatePaymentAPIView,
)

urlpatterns = [
    # Club URLs
    path('clubs/', ClubListAPIView.as_view(), name='club-list'),
    path('clubs/create/', ClubCreateAPIView.as_view(), name='club-create'),
    path('clubs/<str:club_id>/', ClubRetrieveUpdateDestroyAPIView.as_view(), name='club-detail'),

    path('executive-committee/create/', ExecutiveCommitteeCreateAPIView.as_view(), name='ec-create'),
    path('executive-committee/<str:id>/', ExecutiveCommitteeRetrieveUpdateDestroyAPIViewAPIView.as_view(), name='ec-rud'),

    # Event URLs
    path('events/', EventListAPIView.as_view(), name='event-list'),
    path('events/create/', EventListCreateAPIView.as_view(), name='event-create'),
    path('events/<str:event_id>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='event-detail'),
    path('events/<str:event_id>/register/', EventRegisterAPIView.as_view(), name='event-register'),
    # path('payments/create/<str:reg_id>/', CreatePaymentAPIView.as_view(), name='create-payment'),

    # Project URLs
    path('projects/', ProjectAPIView.as_view(), name='project-list-create'),
    path('projects/<str:project_id>/', ProjectRetrieveUpdateAPIView.as_view(), name='project-detail'),

    # Member URLs
    path('clubs/<str:club_id>/members/', MembersByClubAPIView.as_view(), name='club-members'),

    # Award URLs
    path('awards/', AwardAPIView.as_view(), name='award-create'),

    # Meeting URLs
    path('meetings/', MeetingListAPIView.as_view(), name='meeting-list'),
    
    # Weekly Meetings
    path('meetings/create/', MeetingCreateAPIView.as_view(), name='weekly-meeting-create'),
    
    path('meetings/weekly/', WeeklyMeetingListAPIView.as_view(), name='weekly-meeting-list'),
    path('meetings/weekly/<str:meeting_id>/', WeeklyMeetingRetrieveUpdateDestroyAPIView.as_view(), name='weekly-meeting-detail'),

    path('meetings/executive-committee/', ExecutiveCommitteeMeetingListAPIView.as_view(), name='executive-meeting-list'),
    path('meetings/executive-committee/<str:meeting_id>/', ExecutiveCommitteeMeetingRetrieveUpdateDestroyAPIView.as_view(), name='executive-meeting-detail'),

    # Membership URLs
    path('membership/create/', MembershipAPIView.as_view(), name='membership-create'),
    # Optional: i'll add this one further
    # path('membership/activate/', MembershipActivateAPIView.as_view(), name='membership-activate'),
    # path('membership/history/', MembershipHistoryListAPIView.as_view(), name='membership-history'),

    # Initiative URLs
    path('initiatives/', InitiativeListAPIView.as_view(), name='initiative-list'),
    path('initiatives/create/', InitiativeCreateAPIView.as_view(), name='initiative-create'),
    path('initiatives/<str:id>/', InitiativeRetrieveUpdateDestroyAPIViewAPIView.as_view(), name='initiative-rud'),
]
