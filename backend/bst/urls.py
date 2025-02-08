from django.urls import path


from .views import (ClubAPIView,
                    ClubRetrieveUpdateDestroyAPIView,
                    
                    EventAPIView,
                    EventRetrieveUpdateDestroyAPIView) 

urlpatterns = [
    path('clubs/', ClubAPIView.as_view(), name='create-club'),
    path('clubs/', ClubAPIView.as_view(), name='list-club'),
    path('clubs/<str:club_name>/', ClubRetrieveUpdateDestroyAPIView.as_view(), name='get-club'),
    path('clubs/<str:club_name>/', ClubRetrieveUpdateDestroyAPIView.as_view(), name='update-club'),
    path('clubs/<str:club_name>/', ClubRetrieveUpdateDestroyAPIView.as_view(), name='remove-club'),


    path('events/', EventAPIView.as_view(), name='create-event'),
    path('events/', EventAPIView.as_view(), name='list-event'),
    path('events/<str:club_name>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='get-event'),
    path('events/<str:club_name>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='update-event'),
    path('events/<str:club_name>/', EventRetrieveUpdateDestroyAPIView.as_view(), name='remove-event'),


]

