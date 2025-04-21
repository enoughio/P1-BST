from django.db import models
from bst.models import club


class ExecutiveCommittee(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=10, blank=True, null=True)
    avatar = models.ImageField(upload_to='profile_images/', default="default.jpg", blank=True)

    club = models.ForeignKey(club.Club, on_delete=models.PROTECT)


    def __str__(self):
        return self.name