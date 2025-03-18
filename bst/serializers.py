from rest_framework import serializers

from bst.models import (club, 
                        event, 
                        event_registration, 
                        meeting, 
                        project,
                        membership,
                        membership_history)

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = club.Club
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event.Event
        fields = '__all__' 
        read_only_fields = ['club']


class EventRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = event_registration.EventRegistration
        fields = '__all__'
        read_only_fields = ['event']
        

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = meeting.Meeting
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = project.Project
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = membership.Membership
        fields = '__all__'


class MembershipActivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = membership_history.MembershipHistory
        fields = '__all__'
        read_only_fields = ['member']

class MembershipHistorySerializer(serializers.ModelSerializer):
    member = serializers.SerializerMethodField()  # Custom field for username
    membership_type = serializers.SerializerMethodField()  # Custom field for formatted membership details

    class Meta:
        model = membership_history.MembershipHistory
        fields = ['id', 'member', 'membership_type', 'start_date', 'end_date']
        read_only_fields = ['member']

    def get_member(self, obj):
        return obj.member.username  # Member ka username return karega

    def get_membership_type(self, obj):
        return f"{obj.membership_type.name} - {obj.membership_type.duration_in_months} months - ₹{obj.membership_type.fee}"