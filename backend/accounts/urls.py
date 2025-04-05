from django.urls import path

from bst.views import MembershipActivateAPIView, MembershipHistoryListAPIView

from .views import (RegisterMemberAPIView,
                    LoginAPIView,
                    LogoutAPIView,
                    get_current_user,
    
                    MemberRetriveAPIView,
                    MemberListAPIView,
                    MemberRetrieveUpdateAPIView,
                    MemberRetrieveUpdateDestroyAPIView,
                    MemberUpdateBasicInfoAPIView,
                    MemberUpdateAdditionalInfoAPIView,
                    
                    MemberProjectRetrieveUpdateAPIView,
                    
                    AdminAPIView,
                    AdminRetriveAPIView,
                    AdminUpdateBasicInfoAPIView,
                    RegisterAdminAPIView,
                    AdminRetrieveUpdateDestroyAPIView)



urlpatterns = [
    # [Auth] - Login & Logout
    path("login/", LoginAPIView.as_view(), name="login"),  # User Login
    path("logout/", LogoutAPIView.as_view(), name="logout"),  # User Logout
    path('me/', get_current_user, name='current-user'), # for current user object
    # [Members] - Register & List
    path("members/create/", RegisterMemberAPIView.as_view(), name="register"),  # Register Member
    path("members/", MemberListAPIView.as_view(), name="list-member"),  # Get all Members

    # [Member Profile & Dashboard]
    path("members/<str:username>/dashboard/", MemberRetriveAPIView.as_view(), name="member-dashboard"),  # Get Member Dashboard
    path("members/<str:username>/basic/", MemberUpdateBasicInfoAPIView.as_view(), name="update-member-basic-info"),  # Update Basic Info
    path("members/<str:username>/additional/", MemberUpdateAdditionalInfoAPIView.as_view(), name="update-member-additional-info"),  # Update Additional Info
    path("members/<str:username>/membership/", MemberUpdateAdditionalInfoAPIView.as_view(), name="update-member-additional-info"),  # membership

    # [Admin] - Member Management (Read, Update, Assign)
    path('members/<str:username>/activate-membership/', MembershipActivateAPIView.as_view(), name='activate-membership'),
    path('members/<str:username>/membership-history/', MembershipHistoryListAPIView.as_view(), name='list-membership'),
    path("members/<str:username>/", MemberRetrieveUpdateAPIView.as_view(), name="member-detail"),  # Get/Update Member Details (Admin)
    path("members/<str:username>/assign/", MemberProjectRetrieveUpdateAPIView.as_view(), name="assign-project"),  # Assign Project (Admin)

    # [Admin Profile & Dashboard]
    path("admins/<str:username>/dashboard/", AdminRetriveAPIView.as_view(), name="get-admin"),  # Get Admin Dashboard
    path("admins/<str:username>/basic/", AdminUpdateBasicInfoAPIView.as_view(), name="update-admin-basic-info"),  # Update Admin Info

    # [Super Admin] - Full Access (Read, Update, Delete)
    path("members/<str:username>/", MemberRetrieveUpdateDestroyAPIView.as_view(), name="rud-member"),  # Read, Update, Delete Member (Super Admin)

    # [Admin Management] - Create, List, Update, Delete
    path("admins/", AdminAPIView.as_view(), name="list-admin"),  # Get All Admins
    path("admins/create/", RegisterAdminAPIView.as_view(), name="create-admin"),  # Create Admin
    path("admins/<str:username>/", AdminRetrieveUpdateDestroyAPIView.as_view(), name="rud-admin"),  # Read, Update, Delete Admin (Super Admin)
]