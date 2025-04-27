from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager

from bst.models import club, award

import uuid
from PIL import Image
from django.utils import timezone
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
    mobile = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.ImageField(upload_to='profile_images/', default='default.jpg', blank=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='Male')
    dob = models.DateField(default=timezone.now)
    id_proof = models.FileField(upload_to='id_proofs/', blank=True, null=True)
    club = models.ForeignKey(club.Club, on_delete=models.CASCADE, null=True, blank=True)
    join_date = models.DateTimeField(auto_now_add=True)

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
    
    def get_full_name(self):
        if self.first_name or self.last_name:
            return f"{self.first_name} {self.last_name}".strip()
        return self.username


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
    awards = models.ManyToManyField(award.Award, related_name='members',blank=True, null=True)

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



class MemberRemovalRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected')
    ]

    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='removal_requests')
    requested_by = models.ForeignKey(Admin, on_delete=models.CASCADE, related_name='removal_requests_created')
    reason = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Remove {self.member.username} from {self.member.club.club_name} (Status: {self.status})"
