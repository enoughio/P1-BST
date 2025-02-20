from rest_framework import serializers

<<<<<<< HEAD
from bst.models import club, event, meeting, project
=======
from bst.models import club, event, meeting
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = club.Club
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event.Event
        fields = '__all__' 
        

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = meeting.Meeting
<<<<<<< HEAD
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = project.Project
=======
>>>>>>> 4312131207f86003a5d39219bf7db4df82b05cd7
        fields = '__all__'