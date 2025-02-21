from django.db import models

from bst.models.club import Club

from datetime import datetime

class Event(models.Model):
    event_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=datetime.now)
    location = models.TextField(blank=True, null=True)    
    club = models.ForeignKey(Club, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
