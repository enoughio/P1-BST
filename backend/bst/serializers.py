from rest_framework import serializers

from bst.models import club, event, meeting

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
        fields = '__all__'