from django.db import models

from django.contrib.auth.models import AbstractUser

from .managers import UserManager

from bst.models.project import Project

import uuid

# Create your models here.
class User(AbstractUser):
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    OCCUPATION_CHOICES = [
        ('Student', 'Student'),
        ('Employee', 'Employeed'),
        ('Business', 'Business'),
        ('Self Employeed', 'Self Employeed'),
    ]

    ROLE_CHOICES = [
        ('Member', 'Member'),
        ('Admin', 'Admin'),
        ('SuperAdmin', 'SuperAdmin'),
    ]

    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    email = models.EmailField(unique=True)
    phone_number = models.CharField(unique=True, max_length=10)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default=GENDER_CHOICES[0][0])
    DOB = models.DateField(default='2001-04-11') #Default as today's date #2001-04-11
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, default=OCCUPATION_CHOICES[0][0])
    id_proof = models.FileField(upload_to='id_proofs/', default=None)

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Member')

    project = models.ForeignKey(Project, on_delete=models.SET_NULL, blank=True, null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return f"(Member) - {self.username}"
    
    # def save(self, *args, **kwargs):
    #     if not self.pk and not User.objects.filter(pk=self.pk).exists():
    #         self.set_password(self.password) #Password hashing sirf tab hoga jab new user ho!
    #     return super(User, self).save(*args, **kwargs)