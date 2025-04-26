from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import (CreateModelMixin,
                                   ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin,
                                   DestroyModelMixin)

from rest_framework import generics, response, status

from accounts.models import Member, Admin

from bst.models import club, event, event_registration, meeting, project, award, membership, membership_history

from accounts.serializers import MemberSerializer
from bst.serializers import (ClubSerializer,
                             EventSerializer,
                             EventRegisterSerializer,
                             MeetingSerializer,
                             ProjectSerializer,
                             ProjectHistorySerializer,
                             MembershipSerializer,
                             MembershipActivateSerializer,
                             MembershipHistorySerializer,
                             AwardSerializer,

                             InitiativeSerializer, 

                             WeeklyMeetingMeetingSerializer,
                             ExecutiveCommitteeMeetingSerializer,  

                             )


from rest_framework.permissions import BasePermission
from django.utils import timezone
from django.shortcuts import get_object_or_404

def get_real_instance(user):
    if hasattr(user, 'member'):
        return user.member
    if hasattr(user, 'admin'):
        return user.admin
    return user


# permissions
class AdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        # print(ContentType.objects.get_for_model(request.user)) # isse bhi kiska instance h mil jayega
        return request.user and isinstance(get_real_instance(request.user), Admin)

        # print(type(request.user)) #and isinstance(request.user, Admin)) # isinstance(object, classinfo)

class SuperAdminLevelPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
    

class AdminSuperAdminLevelPersmission(BasePermission):
    def has_permission(self, request, view):
        return request.user and (isinstance(get_real_instance(request.user), Admin) or (request.user.is_superuser))


# Create your views here.
class ClubCreateAPIView(GenericAPIView, CreateModelMixin):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer

    # permission_classes = [SuperAdminLevelPermission]

    def post(self, request):
        return self.create(request)
    
class ClubListAPIView(GenericAPIView, ListModelMixin):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer

    def get(self, request):
        return self.list(request)
    

class ClubRetrieveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'club_id'
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    

class ClubRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = club.Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'club_id'

    # permission_classes = [SuperAdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    


class EventListCreateAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = event.Event.objects.all().order_by('-date')
    serializer_class = EventSerializer
    # permission_classes = [AdminSuperAdminLevelPersmission]

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


    # def perform_create(self, serializer):
    #     admin_user = self.request.user  # Current logged-in admin
    #     serializer.save(club=admin_user.club)  # Automatically set club


class EventListAPIView(GenericAPIView, ListModelMixin):
    queryset = event.Event.objects.all()
    serializer_class = EventSerializer

    def get(self, request):
        return self.list(request)
    

class EventRetrieveAPIView(GenericAPIView, RetrieveModelMixin):
    queryset = event.Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'event_id'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    

class EventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = event.Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'event_id'

    # permission_classes = [AdminLevelPermission, SuperAdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class EventRegisterAPIView(generics.CreateAPIView):
    serializer_class = EventRegisterSerializer

    def perform_create(self, serializer):
        event_id = self.kwargs.get('event_id')
        try:
            evnt = event.Event.objects.get(event_id=event_id)
            if evnt.date < timezone.now():
                return Response({'error': "This event has already occurred"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save(event=evnt)
        except event.Event.DoesNotExist:
            raise Response({'error': "Event not found"}, status=status.HTTP_404_NOT_FOUND)


class ProjectAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = project.ProjectHistory.objects.all()
    serializer_class = ProjectHistorySerializer

    # permission_classes = [AdminLevelPermission]

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)
    

    
class ProjectRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = project.Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'project_id'

    permission_classes = [AdminLevelPermission]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    


class MeetingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = meeting.Meeting.objects.all()
    serializer_class = MeetingSerializer

    def post(self, request, *args, **kwargs):
        pass


class MembershipAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = membership.Membership.objects.all()
    serializer_class = MembershipSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)


class MembershipActivateAPIView(GenericAPIView, CreateModelMixin):
    queryset = membership_history.MembershipHistory.objects.all()
    serializer_class = MembershipActivateSerializer

    def post(self, request, username):
        member = get_object_or_404(Member, username=username)  # Member ko database se fetch karna
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(member=member)  # Member ko automatically assign kiya
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MembershipHistoryListAPIView(GenericAPIView, ListModelMixin):
    serializer_class = MembershipHistorySerializer

    def get_queryset(self):
        username = self.kwargs.get('username')
        member = get_object_or_404(Member, username=username)
        return membership_history.MembershipHistory.objects.filter(member=member)

    def get(self, request, username):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class MembersByClubAPIView(APIView):
    def get(self, request, club_id):
        if not club_id:
            return Response({"error": "Club ID required"}, status=400)

        members = Member.objects.filter(club_id=club_id)
        serializer = MemberSerializer(members, many=True)
        return Response(serializer.data)




class AwardAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = award.Award.objects.all()
    serializer_class = AwardSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)
    

class WeeklyMeetingAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = meeting.Meeting.objects.all()
    serializer_class = WeeklyMeetingMeetingSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)

class ExecutiveCommitteeMeetingAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = meeting.Meeting.objects.all()
    serializer_class = ExecutiveCommitteeMeetingSerializer

    def post(self, request):
        return self.create(request)
    
    def get(self, request):
        return self.list(request)


class InitiativeAPIView(GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = club.Initiative.objects.all()
    serializer_class = InitiativeSerializer

    def get(self, request):
        return self.list(request)