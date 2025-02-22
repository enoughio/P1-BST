from rest_framework.generics import GenericAPIView
from rest_framework.mixins import (CreateModelMixin,
                                   ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin,
                                   DestroyModelMixin)

from rest_framework import generics

from bst.models import club, event, meeting, project
from bst.serializers import (ClubSerializer,
                             EventSerializer,
                             MeetingSerializer,
                             ProjectSerializer,
                             )


from rest_framework.permissions import IsAdminUser


# Create your views here.
class ClubAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)
    

class ClubRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'club_name'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


class EventAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = meeting.Meeting.objects.all()
    serializer_class = EventSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)
    

class EventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = event.Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'event_id'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ProjectAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = project.Project.objects.all()
    serializer_class = ProjectSerializer

    # permission_classes = [IsAdminUser]

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)
    

    
class ProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = project.Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'project_id'

    # permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
