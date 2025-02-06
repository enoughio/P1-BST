from rest_framework.response import Response

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

class MemberAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    
    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)
    

class MemberRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class MemberProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member
    serializer_class = MemberProjectSerializer
    lookup_field = 'username'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request):
        return self.update(request)
    


# Admin APIView
class AdminAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    
    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)


class AdminRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username' # Yeh username ke basis par member ko find karega (by default id)

    # update, and delete ke saath get method aayenge, kyoki pahle existing data ko view then update, or remove

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
