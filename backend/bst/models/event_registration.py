from django.db import models

from bst.models.event import Event
from accounts.models import User

class EventRegistration(models.Model):
    
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other")
    ]

    OCCUPATION_CHOICES = [
        ('Student', 'Student'),
        ('Employee', 'Employeed'),
        ('Business', 'Business'),
        ('Self Employeed', 'Self Employeed'),
    ]
    
    registration_id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, related_name="event_model", on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True,  null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="Male")
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, default=OCCUPATION_CHOICES[0][0])


    def __str__(self):
        return self.registration_id


    
    # user = models.ForeignKey(User, related_name="event_user", on_delete=models.CASCADE)
