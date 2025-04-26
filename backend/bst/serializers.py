from rest_framework import serializers

from accounts.models import Member
from bst.models import executive_committee

from bst.models import (club, 
                        event, 
                        event_registration, 
                        meeting, 
                        project,
                        award,
                        meeting,
                        membership,
                        membership_history)


class ClubSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    executive_committee = serializers.SerializerMethodField()
    initiative = serializers.SerializerMethodField()

    admin = serializers.SerializerMethodField()

    class Meta:
        model = club.Club
        fields = [
            "club_id",
            "initiative",
            "club_name",
            "address",
            "city",
            "meeting_time",
            "position",
            "dms_position",
            "members",
            "image",
            "email",
            "mobile",
            "executive_committee",
            "admin",
        ]

    def get_admin(self, obj):
        from accounts.models import Admin

        admin = Admin.objects.filter(club=obj).first()
        if admin:
            return admin.get_full_name()
        return None


    def get_members(self, obj):
        return Member.objects.filter(club=obj).count()
    
    def get_address(self, obj):
        address_parts = [
            obj.street,
            obj.city,
            obj.state,
            obj.postal_code,
            obj.country
        ]
        return ", ".join(filter(None, address_parts))
    
    def get_executive_committee(self, obj):
        committee_members = executive_committee.ExecutiveCommittee.objects.filter(club=obj)
        return [
            {
                "id": member.id,
                "name": member.name,
                "role": member.role,
                "email": member.email,
                "mobile": member.mobile,
                "avatar": member.avatar.url
            } for member in committee_members
        ]
    
    def get_initiative(self, obj):
        return obj.initiative.title


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = event.Speaker
        fields = ['name', 'role', 'bio', 'image']


class ScheduleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = event.ScheduleItem
        fields = ['time', 'title', 'description']


class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = event.EventPhoto
        fields = ['url', 'alt']


class EventSerializer(serializers.ModelSerializer):
    speakers = SpeakerSerializer(many=True)
    schedule = ScheduleItemSerializer(many=True)
    photos = EventPhotoSerializer(many=True)

    class Meta:
        model = event.Event
        fields = [
            'event_id', 'title', 'description',
            'date', 'time', 'location', 'image',
            'highlighted', 'club', 'attendees', 'max_capacity',
            'ticket_price', 'categories',
            'speakers', 'schedule', 'photos'
        ]


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

class ProjectHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = project.ProjectHistory
        fields = ['member', 'project', 'assigned_date', 'completion_date']


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


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = award.Award
        fields = ['id', 'title', 'date', 'type']


class WeeklyMeetingMeetingSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    location = serializers.ReadOnlyField()
    roles = serializers.SerializerMethodField()

    class Meta:
        model = meeting.Meeting
        fields = ['meeting_id', 'title', 'date', 'time', 'location', 'description', 'roles']

    def get_time(self, obj):
        start = obj.start_time.strftime("%I:%M %p")
        end = obj.end_time.strftime("%I:%M %p")
        return f"{start} - {end}"

    def get_roles(self, obj):
        role_fields = {
            "master_of_ceremony": obj.MOC,
            "open_mic_coordinator": obj.OMC,
            "moderator": obj.moderator,
            "coordinator": obj.coordinator,
            "timekeeper": obj.timekeeper,
            "listener": obj.listener,
            "filler_counter": obj.filler_counter,
            "speaker1": obj.speaker1,
            "speaker2": obj.speaker2,
            "speaker3": obj.speaker3,
            "speech_evaluator1": obj.speech_evaluator1,
            "speech_evaluator2": obj.speech_evaluator2,
        }

        roles_list = []
        for role_name, member in role_fields.items():
            roles_list.append({
                "role": role_name.replace("_", " "),
                "assignedTo": member.username if member else None
            })

        return roles_list
    

class ExecutiveCommitteeMeetingSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    location = serializers.ReadOnlyField()
    roles = serializers.SerializerMethodField()

    class Meta:
        model = meeting.Meeting
        fields = ['meeting_id', 'title', 'date', 'time', 'location', 'description', 'roles']

    def get_time(self, obj):
        start = obj.start_time.strftime("%I:%M %p")
        end = obj.end_time.strftime("%I:%M %p")
        return f"{start} - {end}"

    def get_roles(self, obj):
        return [
            {
                "role": "MOC",
                "assignedTo": str(obj.MOC.username) if obj.MOC else None
            },
            {
                "role": "OMC",
                "assignedTo": str(obj.OMC.username) if obj.OMC else None
            },
            {
                "role": "CE",
                "assignedTo": str(obj.CE.username) if obj.CE else None
            },
            {
                "role": "Grammarian",
                "assignedTo": None  # not assigned yet
            },

            # {
            #     "role": "master of ceramony",
            #     "assignedTo": str(obj.MOC.id) if obj.MOC else None
            # },
            # {
            #     "role": "Timer",
            #     "assignedTo": str(obj.OMC.id) if obj.OMC else None
            # },
            # {
            #     "role": "Ah Counter",
            #     "assignedTo": str(obj.CE.id) if obj.CE else None
            # },
            # {
            #     "role": "Grammarian",
            #     "assignedTo": None  # not assigned yet
            # },
            # {
            #     "role": "Speaker 1",
            #     "assignedTo": str(obj.OMC.id) if obj.OMC else None  # just an example
            # }
        ]

#         role_fields = {
#             "president": obj.president,
#             "vice_president_education": obj.vice_president_education,
#             "vice_president_membership": obj.vice_president_membership,
#             "vice_president_public_relations": obj.vice_president_public_relations,
#             "secretary": obj.secretary,
#             "sergeant_at_arms": obj.sergeant_at_arms,
#         }

#         roles_list = []
#         for role_name, member in role_fields.items():
#             roles_list.append({
#                 "role": role_name.replace("_", " "),
#                 "assignedTo": member.username if member else None
#             })

#         return roles_list




class InitiativeSerializer(serializers.ModelSerializer):
    membership = serializers.SerializerMethodField()
    active_clubs = serializers.SerializerMethodField()

    class Meta:
        model = club.Initiative
        fields = ['id', 'title', 'eligible_age', 'description', 'membership', 'max_club_size', 'active_clubs',]
    
    def get_membership(self, obj):
        return obj.membership.__str__()

    def get_active_clubs(self, obj):
        return club.Club.objects.filter(initiative=obj).count()