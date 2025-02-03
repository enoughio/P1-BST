from django.db import models

from bst.models.club import Club

from datetime import datetime
import uuid

class Meeting(models.Model):
    meeting_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    agenda = models.CharField(blank=True, null=True)
    schedule = models.DateTimeField(default=datetime.now) # Manually editable
    location = models.TextField(blank=True, null=True)

    club = models.ForeignKey(Club, on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True) #Sirf first time create hone par date set hogi, baad me change nahi hogi.

    def __str__(self):
        return self.agenda