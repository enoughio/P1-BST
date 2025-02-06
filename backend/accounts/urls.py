from django.urls import path

from .views import (MemberAPIView,
                    MemberRetrieveUpdateDestroyAPIView,
                    
                    MemberProjectRetrieveUpdateAPIView,
                    
                    AdminAPIView,
                    AdminRetrieveUpdateDestroyAPIView)


urlpatterns = [
    path('members/', MemberAPIView.as_view(), name='create-member'),
    path('members/', MemberAPIView.as_view(), name='list-member'),
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='get-member'),
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='update-member'),
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='remove-member'),

    path('<str:username>/assign/', MemberProjectRetrieveUpdateAPIView.as_view(), name='assign-project'),

    path('admins/', AdminAPIView.as_view(), name='create-admin'),
    path('admins/', AdminAPIView.as_view(), name='list-admin'),
    path('admins/<str:username>/', AdminRetrieveUpdateDestroyAPIView.as_view(), name='get-admin'),
    path('admins/<str:username>/', AdminRetrieveUpdateDestroyAPIView.as_view(), name='update-admin'),
    path('admins/<str:username>/', AdminRetrieveUpdateDestroyAPIView.as_view(), name='remove-admin'),
]
