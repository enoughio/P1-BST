from django.db import models

from django.contrib.auth.models import AbstractUser

from .managers import UserManager

from bst.models import club, project

import uuid
from PIL import Image

# User Model
class User(AbstractUser):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    email = models.EmailField(unique=True)
    phone = models.CharField(unique=True, max_length=10)
    image = models.ImageField(upload_to='profile_images/', default='default.jpg')
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default=GENDER_CHOICES[0][0])
    dob = models.DateField(default='2001-04-11') #Default as today's date #2001-04-11
    id_proof = models.FileField(upload_to='id_proofs/', default=None)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.pk and not User.objects.filter(pk=self.pk).exists():
            self.set_password(self.password) #Password hashing sirf tab hoga jab new user ho!
        return super(User, self).save(*args, **kwargs)


# Member Model
class Member(User):
    OCCUPATION_CHOICES = [
        ('Student', 'Student'),
        ('Employee', 'Employeed'),
        ('Business', 'Business'),
        ('Self Employeed', 'Self Employeed'),
    ]

    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, default=OCCUPATION_CHOICES[0][0])
    role = models.CharField(max_length=20, default='Member', editable=False)

    project = models.ForeignKey(project.Project, on_delete=models.SET_NULL, blank=True, null=True)
    assinged_date = models.DateTimeField(blank=True, null=True)
    completion_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "Member"
        verbose_name_plural = "Members"


    # for resizing image
    # def save(self):
    #     super().save()

    #     img = Image.open(self.image.path)

    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)


    def __str__(self):
        return f"(Member) - {self.username}"


# Admin - (admin, superadmin) Model
class Admin(User):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('SuperAdmin', 'SuperAdmin'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Admin')
    club = models.ForeignKey(club.Club, on_delete=models.CASCADE)

    #required, kyoki admin-pannel pr User likh kr aayega, due to inheritance
    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins" # Yeh admin panel mein plural name define karega


    # for resizing image
    # def save(self):
    #     super().save()

    #     img = Image.open(self.image.path)

    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)


    def __str__(self):
        if self.is_superuser:
            return f"(SuperAdmin) - {self.username}"
        return f"(Admin) - {self.username}"


