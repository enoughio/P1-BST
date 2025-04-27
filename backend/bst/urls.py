from django.urls import path


from .views import (ClubCreateAPIView,
                    ClubListAPIView,
                    ClubRetrieveUpdateDestroyAPIView,
                    
                    EventListCreateAPIView,
                    EventListAPIView,
                    EventRetrieveAPIView,
                    EventRegisterAPIView,
                    
                    EventRetrieveUpdateDestroyAPIView,
                    
                    ProjectAPIView,
                    ProjectRetrieveUpdateAPIView,
                    
                    MembershipAPIView,
                    MembershipActivateAPIView,
                    MembershipHistoryListAPIView,

                    MembersByClubAPIView,    
                    AwardAPIView,
                    WeeklyMeetingAPIView,
                    ExecutiveCommitteeMeetingAPIView,

                    InitiativeAPIView,
                    ) 

urlpatterns = [
    path('clubs/', ClubListAPIView.as_view(), name='list-club'),
    path('clubs/create/', ClubCreateAPIView.as_view(), name='create-club'),
    path('clubs/<str:club_id>/', ClubRetrieveUpdateDestroyAPIView.as_view(), name='rud-club'),

    path('events/create/', EventListCreateAPIView.as_view(), name='create-event'),
    path('events/', EventListAPIView.as_view(), name='list-event'),
    path('events/<str:event_id>/', EventRetrieveAPIView.as_view(), name='get-event'),
    path('events/<str:event_id>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='rud-event'),

    path('events/<str:event_id>/register/', EventRegisterAPIView.as_view(), name='event-register'),
    # path('payments/create/<str:registration_id>/', CreateOrderView.as_view(), name='create-payment'),
    # path('payments/verify/', VerifyPaymentView.as_view(), name='verify-payment'),
    
    
    path('projects/', ProjectAPIView.as_view(), name='create-project'),
    path('projects/', ProjectAPIView.as_view(), name='list-project'),
    path('projects/<int:project_id>/', ProjectRetrieveUpdateAPIView.as_view(), name='get-project'),
    path('projects/<int:project_id/', ProjectRetrieveUpdateAPIView.as_view(), name='update-project'),

    path('clubs/<str:club_id>/members/', MembersByClubAPIView.as_view()),
    
    path('awards/', AwardAPIView.as_view(), name='create-award'),
    path('meetings/weekly/', WeeklyMeetingAPIView.as_view(), name='weekly-meeting'),
    path('meetings/executive-committee/', ExecutiveCommitteeMeetingAPIView.as_view(), name='executive-meeting'),

    path('membership/create/', MembershipAPIView.as_view(), name='create-membership'),

    path('initiatives/', InitiativeAPIView.as_view(), name='list-initiatives')
]

