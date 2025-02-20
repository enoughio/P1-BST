from rest_framework.response import Response
# from rest_framework.decorators import api_view, authentication_classes

from .models import Member, Admin
from accounts.serializers import (MemberSerializer,
                                  MemberProjectSerializer,
                                  AdminSerializer)

from rest_framework.generics import GenericAPIView
from rest_framework import generics
from rest_framework.mixins import (ListModelMixin, 
                                   CreateModelMixin, 
                                   RetrieveModelMixin,
                                   UpdateModelMixin,)

from rest_framework.authentication import TokenAuthentication
<<<<<<< HEAD
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission
=======
from rest_framework.permissions import IsAuthenticated
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
from rest_framework import status

from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

<<<<<<< HEAD

# permissions
class AdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role=='Admin'

class SuperAdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
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

<<<<<<< HEAD
# register (create member)
=======
# register
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
class RegisterAPIView(GenericAPIView, CreateModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def post(self, request):
        return self.create(request)


<<<<<<< HEAD
# list members
class MemberListAPIView(GenericAPIView, ListModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    permission_classes = [IsAdminUser]
=======
class MemberAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
    
    def get(self, request):
        return self.list(request)
    

<<<<<<< HEAD
# For member (dashboard)
class MemberRetriveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    

=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
class MemberRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

<<<<<<< HEAD
    permission_classes = [IsAdminUser]

=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

<<<<<<< HEAD
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
=======

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


<<<<<<< HEAD

# class MemberProjectRetrieve(GenericAPIView, RetrieveModelMixin):
#     queryset = 


=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
class MemberProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member
    serializer_class = MemberProjectSerializer
    lookup_field = 'username'

<<<<<<< HEAD
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
=======
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request):
        return self.update(request)
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
    


# Admin APIView
class AdminAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    
    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)


<<<<<<< HEAD
# For member (dashboard)
class AdminRetriveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
class AdminRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

<<<<<<< HEAD
    permission_classes = [SuperAdminLevelPermission]

=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
<<<<<<< HEAD
    


=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
