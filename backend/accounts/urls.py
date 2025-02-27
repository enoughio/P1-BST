from django.urls import path

from .views import (RegisterMemberAPIView,
                    LoginAPIView,
                    LogoutAPIView,
    
                    MemberRetriveAPIView,
                    MemberListAPIView,
                    MemberRetrieveUpdateAPIView,
                    MemberRetrieveUpdateDestroyAPIView,
                    MemberUpdateBasicInfoAPIView,
                    MemberUpdateAdditionalInfoAPIView,
                    
                    MemberProjectRetrieveUpdateAPIView,
                    
                    AdminAPIView,
                    AdminRetriveAPIView,
                    RegisterAdminAPIView,
                    AdminRetrieveUpdateDestroyAPIView)


urlpatterns = [
    # [auth]
    path("login/", LoginAPIView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path('members/create/', RegisterMemberAPIView.as_view(), name='register'),

    # [members]
    path('members/', MemberListAPIView.as_view(), name='list-member'),
    path('<str:username>/dashboard/', MemberRetriveAPIView.as_view(), name='member-dashboard'),
    path('members/<str:username>/basic/', MemberUpdateBasicInfoAPIView.as_view(), name='update-member-basic-info'),
    path('members/<str:username>/additional/', MemberUpdateAdditionalInfoAPIView.as_view(), name='update-member-additional-info'),
    
    # [admin] - Read,Update
    path('members/<str:username>/', MemberRetrieveUpdateAPIView.as_view(), name='member-detail'),
    path('members/<str:username>/assign/', MemberProjectRetrieveUpdateAPIView.as_view(), name='assign-project'),
    
    # [super-admin] - Read,Update,Delete
    path('members/<str:username>/', MemberRetrieveUpdateDestroyAPIView.as_view(), name='rud-member'),

    path('<str:username>/dashboard/', AdminRetriveAPIView.as_view(), name='get-admin'),
    path('admins/', AdminAPIView.as_view(), name='list-admin'),
    path('admins/create/', RegisterAdminAPIView.as_view(), name='create-admin'),
    path('admins/<str:username>/', AdminRetrieveUpdateDestroyAPIView.as_view(), name='rud-admin'),
]


'''
[members]
http://127.0.0.1:8000/api/accounts/
login/
logout/
members/create/

[to list members - admin only]
http://127.0.0.1:8000/api/accounts/
members/
members/username/      for ReadUpdateDelete operations
members/username/assign/    for assigning the project to respective member

[members can do it]
http://127.0.0.1:8000/api/accounts/
username/dashboard/
members/username/basic/     - to update basic info of members
members/username/additional/     - to update basic additional of members



[admin]
http://127.0.0.1:8000/api/accounts/
username/dashboard/
admins/     for list admin [only via superadmin]
admins/create/     for list admin [only via superadmin]
'''
