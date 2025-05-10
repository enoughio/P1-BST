from rest_framework import serializers

from bst.serializers import AwardSerializer, MeetingSerializer
from .models import Member, Admin, MemberRemovalRequest
from bst.models import project, meeting

from django.utils import timezone

from django.contrib.auth import get_user_model


# current_user (i.e. user) object keLiye 
class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    occupation = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'mobile', 'avatar', 'address', 'gender', 'dob', 'id_proof', 'club', 'role', 'occupation',)
        read_only_fields = ('id', 'username', 'email')

    def get_role(self, user):
        if hasattr(user, 'member'):
            return user.member.role
        elif hasattr(user, 'admin'):
            return user.admin.role
        return "User"

    def get_occupation(self, user):
        if hasattr(user, 'member'):
            return user.member.occupation
        return None


# creating a member uske liye serializer
class MemberRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # Write-only ka matlab hai ki password response mein return nahi hoga

    class Meta:
        model = Member
        # fields = '__all__'
        fields = ['first_name', 'last_name', 'username', 'email', 'mobile', 'avatar', 'address', 'gender', 'dob', 'id_proof', 'club', 'role', 'occupation', 'password']
        read_only_fields = ['role']

    # create ko call karna jruri h, kyoki field that is not writable (response mein nhi aate hn i.e. pwd). usko create() ko override krke resolve kro
    # Django ka recommended approach yeh hai ki password hashing ko serializer mein handle kiya jaye for Consistency and Flexibility concerns
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            member = Member(**validated_data) # Member ka object create kr rha hu, so that pwd nikal sku
            member.set_password(password)
            member.save()
        return member 


class MemberSerializer(serializers.ModelSerializer):
    # project_title = serializers.SerializerMethodField() # Custom field
    name = serializers.SerializerMethodField()
    club_name = serializers.SerializerMethodField()
    join_date = serializers.DateTimeField(format="%d-%b-%Y %I:%M %p")
    membership_start_date = serializers.SerializerMethodField()
    membership_expiry_date = serializers.SerializerMethodField()
    completed_projects = serializers.SerializerMethodField()
    active_projects = serializers.SerializerMethodField()
    upcoming_meetings = serializers.SerializerMethodField()
    achievements = AwardSerializer(source='awards', many=True)

    class Meta:
        model = Member
        fields = ['name', 'username', 'email', 'mobile', 'club_name', 'join_date', 'membership_start_date', 'membership_expiry_date', 'avatar', 'address', 'gender', 'dob', 'id_proof', 'occupation', 'completed_projects', 'active_projects', 'upcoming_meetings', 'achievements']
    
    def get_name(self, obj):
        if obj.first_name or obj.last_name:
            return f"{obj.first_name} {obj.last_name}".strip()
        return obj.username
    
    def get_club_name(self, obj):
        return obj.club.club_name
    
    def get_membership_start_date(self, obj):
        history = obj.membershiphistory_set.order_by('-start_date').first()
        return history.start_date if history else None

    def get_membership_expiry_date(self, obj):
        history = obj.membershiphistory_set.order_by('-start_date').first()
        return history.end_date if history else None
    
    def get_completed_projects(self, obj):
        now = timezone.now()
        return project.ProjectAssignment.objects.filter(
            member=obj,
            deadline__lt=now
        ).count()
    
    def get_active_projects(self, obj):
        now = timezone.localtime(timezone.now())
        projects = project.ProjectAssignment.objects.filter(
            member=obj, 
            deadline__gte=now
        )

        return [
            {
                "id": project.project.project_id,
                "title": project.project.title,
                "assigned_date": project.assigned_date.strftime("%d-%b-%Y %I:%M %p"),   # "09-Apr-2025 07:42 PM"
                "deadline": project.deadline.strftime("%d-%b-%Y %I:%M %p"),
                "current_time": now.strftime("%d-%b-%Y %I:%M %p")
            } for project in projects
        ]
    
    def get_upcoming_meetings(self, obj):
        today = timezone.localtime().date()
        meetings = meeting.Meeting.objects.filter(club=obj.club, date__gte=today).order_by('date')
        return MeetingSerializer(meetings, many=True).data


class MemberListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    club_name = serializers.SerializerMethodField()
    membership_expiry_date = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ['id', 'username', 'name', 'email', 'mobile', 'club_name', 'membership_expiry_date',]
    
    def get_name(self, obj):
        if obj.first_name or obj.last_name:
            return f"{obj.first_name} {obj.last_name}".strip()
        return obj.username
    
    def get_club_name(self, obj):
        return obj.club.club_name
    
    def get_membership_expiry_date(self, obj):
        history = obj.membershiphistory_set.order_by('-start_date').first()
        return history.end_date if history else None


# basic-info and aditional-info
class MemberBasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['first_name', 'last_name', 'phone', 'avatar', 'gender']

class MemberAdditionalInfoSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['address', 'dob', 'occupation', 'awards']


    
# Adding project to Member wala serializer    
# class MemberProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = project.ProjectHistory
#         fields = ['member', 'project', 'assigned_date', 'deadline']


# AdminSerializer
class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Admin
        fields = ['first_name', 'last_name', 'username', 'email', 'mobile', 'avatar', 'address', 'gender', 'dob', 'id_proof', 'role', 'club', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            admin = Admin(**validated_data)
            admin.set_password(password)
            admin.save()
        return admin
    

# serialize basic-info
class AdminBasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['first_name', 'last_name', 'phone', 'avatar', 'gender', 'dob', 'address']




class MemberRemovalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberRemovalRequest
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request:
            admin = request.user
            self.fields['member'].queryset = Member.objects.filter(club=admin.club)
            self.fields['requested_by'].queryset = Admin.objects.filter(username=admin.username)

    def validate(self, data):
        user = self.context['request'].user
        try:
            requested_by = Admin.objects.get(id=user.id)
        except Admin.DoesNotExist:
            raise serializers.ValidationError("Only admins can create removal requests.")
        
        member = data.get('member')

        if requested_by.club != member.club:
            raise serializers.ValidationError("Admin and Member must belong to the same club.")

        data['requested_by'] = requested_by
        return data
    

class RequestApproveRejectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberRemovalRequest
        fields = '__all__'
        read_only_fields = ['member', 'requested_by', 'created_at', 'updated_at']
        