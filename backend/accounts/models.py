from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from bst.models import club, project
import uuid
from PIL import Image
import datetime
from django.core.exceptions import ValidationError

# User Model
class User(AbstractUser):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.ImageField(upload_to='profile_images/', default='default.jpg', blank=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='Male')
    dob = models.DateField(default=datetime.date.today)
    id_proof = models.FileField(upload_to='id_proofs/', blank=True, null=True)
    club = models.ForeignKey(club.Club, on_delete=models.CASCADE, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        verbose_name = "SuperAdmin"
        verbose_name_plural = "SuperAdmin"

    # def save(self, *args, **kwargs):
    #     # Ensure the password is hashed when creating a new user
    #     if not self.pk:  # New user
    #         self.set_password(self.password)

    #     super().save(*args, **kwargs)

    #     # Resize avatar if needed
    #     if self.avatar and hasattr(self.avatar, 'path'):
    #         img = Image.open(self.avatar.path)
    #         if img.height > 300 or img.width > 300:
    #             output_size = (300, 300)
    #             img.thumbnail(output_size)
    #             img.save(self.avatar.path)

    def __str__(self):
        return f"{self.username} ({self.email})"


# Member Model
class Member(User):
    OCCUPATION_CHOICES = [
        ('Student', 'Student'),
        ('Employee', 'Employee'),
        ('Business', 'Business'),
        ('Self Employed', 'Self Employed'),
    ]

    role = models.CharField(max_length=20, default='Member')
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, default='Student')

    project = models.ForeignKey(project.Project, on_delete=models.SET_NULL, blank=True, null=True)
    assigned_date = models.DateTimeField(blank=True, null=True)
    completion_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = "Member"
        verbose_name_plural = "Members"

    def __str__(self):
        return f"(Member) - {self.username}"


# Admin Model
class Admin(User):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('SuperAdmin', 'SuperAdmin'),
    ]

    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='Admin')

    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    def __str__(self):
        if self.is_superuser:
            return f"(SuperAdmin) - {self.username}"
        return f"(Admin) - {self.username}"
