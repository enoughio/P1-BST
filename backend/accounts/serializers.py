from rest_framework import serializers
from .models import Member, Admin

# creating a member uske liye serializer
class MemberSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    # Write-only ka matlab hai ki password response mein return nahi hoga

    class Meta:
        model = Member
        # fields = '__all__'
        fields = ['first_name', 'last_name', 'username', 'email', 'phone', 'image', 'address', 'gender', 'dob', 'id_proof', 'occupation', 'password']


    # create ko call karna jruri h, kyoki field that is not writable (response mein nhi aate hn i.e. pwd). usko create() ko override krke resolve kro
    # Django ka recommended approach yeh hai ki password hashing ko serializer mein handle kiya jaye for Consistency and Flexibility concerns
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            member = Member(**validated_data) # Member ka object create kr rha hu, so that pwd nikal sku
            member.set_password(password)
            member.save()
        return member 
    
    
# Adding project to Member wala serializer    
class MemberProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['username', 'project', 'assinged_date', 'completion_date']


# AdminSerializer
class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Admin
        fields = ['first_name', 'last_name', 'username', 'email', 'phone', 'image', 'address', 'gender', 'dob', 'id_proof', 'role', 'club', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password:
            admin = Admin(**validated_data)
            admin.set_password(password)
            admin.save()
        return admin
        