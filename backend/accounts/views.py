from rest_framework.response import Response
# from rest_framework.decorators import api_view, authentication_classes

from .models import Member, Admin
from accounts.serializers import (MemberRegisterSerializer,
                                  MemberListSerializer,
                                  MemberSerializer,
                                  MemberBasicInfoSerializer,
                                  MemberAdditionalInfoSerialzer,
                                  MemberProjectSerializer,
                                  AdminSerializer)

from rest_framework.generics import GenericAPIView
from rest_framework import generics
from rest_framework.mixins import (ListModelMixin, 
                                   CreateModelMixin, 
                                   RetrieveModelMixin,
                                   UpdateModelMixin,)

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
from rest_framework import status

from rest_framework.views import APIView
from rest_framework import viewsets

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# permissions
class AdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'Admin'

class SuperAdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


# TokenBasedAuth (login)
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

# logout 
class LogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] # User Login Hona Chahiye

    def post(self, request):
        request.user.auth_token.delete() # User ka Token Delete
        return Response(status=status.HTTP_200_OK)

# register (create member)
class RegisterAPIView(GenericAPIView, CreateModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberRegisterSerializer

    def post(self, request):
        return self.create(request)


# [Member]
class MemberListAPIView(GenericAPIView, ListModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberListSerializer
    # permission_classes = [AdminLevelPermission]
    
    def get(self, request):
        return self.list(request)
    
        # response = self.list(request)

        # return Response({
        #     'total': self.get_queryset().count(),
        #     # response.data
        # })

# For member (dashboard)
class MemberRetriveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username'

    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)    

class MemberRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

    # permission_classes = [SuperAdminLevelPermission]

    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class MemberUpdateBasicInfoAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberBasicInfoSerializer
    lookup_field = 'username'

    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
class MemberUpdateAdditionalInfoAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberAdditionalInfoSerialzer
    lookup_field = 'username'

    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


# class MemberProjectRetrieve(GenericAPIView, RetrieveModelMixin):
#     queryset = 


class MemberProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member
    serializer_class = MemberProjectSerializer
    lookup_field = 'username'

    # permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

# def total_registered_members(request):
#     cnt = Member.objects.all().count()
#     return cnt
    


# [Admin]
class AdminAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    
    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)


# For admin (dashboard)
class AdminRetriveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class AdminRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

    permission_classes = [SuperAdminLevelPermission]

    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


