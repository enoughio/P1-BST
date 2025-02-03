from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone_number', 'address', 'gender', 'DOB', 'occupation', 'id_proof', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):

        #entire at one time, when no need default value
        # user = User.objects.create_user(**validated_data)

        user = User.objects.create_user(
            # value = dict.pop('key', None) # Returns None (no KeyError)
            username=validated_data.pop('name', None),
            email=validated_data.pop('email', None),
            password=validated_data.pop('password', None),
            **validated_data
        )

        return user