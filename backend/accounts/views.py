from datetime import timedelta
from django.utils import timezone
from rest_framework.response import Response
# from rest_framework.decorators import api_view, authentication_classes

from .models import Member, Admin
from accounts.serializers import (MemberRegisterSerializer,
                                  MemberListSerializer,
                                  MemberSerializer,
                                  MemberBasicInfoSerializer,
                                  MemberAdditionalInfoSerialzer,
                                  MemberProjectSerializer,
                                  AdminSerializer,
                                  AdminBasicInfoSerializer)

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


'''
Jab bhi tum self.create(request), self.retrieve(request), self.update(request), ya self.destroy(request) call karte ho, 
ye ek HTTP Response object return karta hai. Without return, API response nahi milega
'''


# from django.contrib.contenttypes.models import ContentType

def get_real_instance(user):
    if hasattr(user, 'member'):
        return user.member
    if hasattr(user, 'admin'):
        return user.admin
    return user

'''
request.user mei [member, admin] honge always becoz, child of User

and, if we write (request.user.admin) then iff logged-in user Admin ka obj hoga then (Admin) - username
and, if we write (request.user.member) then iff logged-in user Member ka obj hoga then (Member) - username

otherwise, if request.user.admin likhe, and logged-in Member ka obj hua, then will give an error
'''

# permissions
class AdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        # print(ContentType.objects.get_for_model(request.user)) # isse bhi kiska instance h mil jayega
        return request.user and isinstance(get_real_instance(request.user), Admin) # isinstance(object, classinfo)

class SuperAdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
    
# request.headers.get('Authorization') to get JWT token


# [middleware for custom-login i.e. through email and pwd]
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model  #kyoki custom usermodel banaya h

class EmailBackend(ModelBackend):
    def authenticate(self, request, username = None, password = None, **kwargs):
        try:
            User = get_user_model() # overriding default Django default User model
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None


# TokenBasedAuth (login)
'''
Agar tum token ko sirf response mein return karte ho, to token stealing ka risk hota hai. 
Isko mitigate karne ke liye, 
humein token ko HTTP-only cookie mein store karna chahiye, taaki client-side JavaScript se access na ho.
'''
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            # return Response({'token': token.key}, status=status.HTTP_200_OK)

            # But, to secure auth_token, need to apply concept of cookie, so that JS se bhi auth_token access na ho ske

            # Set expiry time
            expiry_time = timezone.now() + timedelta(days=7)  # Token valid for 7 days

            response = Response({
                'message': 'Login successful!',
                'role' : user.member.role if hasattr(user, 'member') else user.admin.role 
            }, status=status.HTTP_200_OK)
            
            # Cookie set karna
            response.set_cookie(
                key='auth_token', 
                value=token.key, 
                httponly=True,     # JS se access nahi ho payega ab
                secure=True,       # HTTPS use karte ho to need to enable this (production mein zaruri hai)
                samesite='Lax',    # CSRF attacks se bachane ke liye
                expires=expiry_time
            )
            return response

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# logout 
class LogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] # User Login Hona Chahiye

    def post(self, request):
        # request.user.auth_token.delete() # User ka Token Delete
        # return Response(status=status.HTTP_200_OK)

        response = Response({'message': 'Logout successful!'}, status=status.HTTP_200_OK)
        # Cookie ko delete karna
        response.delete_cookie('auth_token')
        return response

# register (create member)
class RegisterMemberAPIView(GenericAPIView, CreateModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberRegisterSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

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

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

class MemberRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


# class MemberProjectRetrieve(GenericAPIView, RetrieveModelMixin):
#     queryset = 


class MemberProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member
    serializer_class = MemberProjectSerializer
    lookup_field = 'username'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

# def total_registered_members(request):
#     cnt = Member.objects.all().count()
#     return cnt


# For admin (dashboard)
class AdminRetriveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class AdminUpdateBasicInfoAPIView(generics.RetrieveUpdateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminBasicInfoSerializer
    lookup_field = 'username'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class MemberRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

    permission_classes = [SuperAdminLevelPermission]

    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# [Admin]
class AdminAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

    permission_classes = [SuperAdminLevelPermission]
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
# register (create admin)
class RegisterAdminAPIView(GenericAPIView, CreateModelMixin):
    queryset = Member.objects.all()
    # serializer_class = MemberRegisterSerializer
    serializer_class = AdminSerializer

    permission_classes = [SuperAdminLevelPermission]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


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