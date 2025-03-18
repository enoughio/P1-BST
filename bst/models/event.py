from django.db import models

from bst.models.club import Club

from datetime import datetime


def get_alphanumeric_id():
    last_event = Event.objects.order_by("-event_id").first()
    if not last_event:
        return "E000000"
    
    last_id = int(last_event.event_id[1:])
    return f"E{last_id + 1:06d}"


class Event(models.Model):
    event_id = models.CharField(max_length=7, primary_key=True, default=get_alphanumeric_id, editable=False)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=datetime.now)
    location = models.TextField(blank=True, null=True)    
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Better price handling

    def __str__(self):
        return self.title
