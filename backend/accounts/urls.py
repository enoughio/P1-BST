from django.urls import path

from .views import *


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('register/', register, name='register'),
    path('register/', register, name='profile-user'),
    path('login/', register, name='login'),
    path('logout/', logout_user, name='logout'),
]
