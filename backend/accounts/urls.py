from django.urls import path

from .views import (RegisterAPIView,
                    LoginAPIView,
                    LogoutAPIView,
    
                    MemberRetriveAPIView,
                    MemberListAPIView,
                    MemberRetrieveUpdateDestroyAPIView,
                    
                    MemberProjectRetrieveUpdateAPIView,
                    
                    AdminAPIView,
                    AdminRetrieveUpdateDestroyAPIView)


urlpatterns = [
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path('register/', RegisterAPIView.as_view(), name='register'),

    path('<str:username>/dashboard/', MemberRetriveAPIView.as_view(), name='get-member-dashboard'),
    path('members/', MemberListAPIView.as_view(), name='list-member'),
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='update-member'),
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='remove-member'),

    path('members/<str:username>/assign/', MemberProjectRetrieveUpdateAPIView.as_view(), name='assign-project'),

    path('<str:username>/dashboard/', AdminRetrieveUpdateDestroyAPIView.as_view(), name='get-admin'),
    path('admins/', AdminAPIView.as_view(), name='create-admin'),
    path('admins/', AdminAPIView.as_view(), name='list-admin'),
    path('register/', RegisterAPIView.as_view(), name='register-member'),

    path('members/', MemberListAPIView.as_view(), name='list-member'),
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
