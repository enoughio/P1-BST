from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Email field must be sent")
        email = self.normalize_email(email)
        user = self.model(email, username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)


#Custom User Model
class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    address = models.CharField(max_length=250, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    if_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    #USERNAME_FIELD define karta hai ki kis field ko authentication (login) ke liye use kiya jayega.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] # 'username' user creation ke waqt zaroori hoga

    objects = CustomUserManager()

    def __str__(self):
        return self.username
    

