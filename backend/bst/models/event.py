from django.db import models
from bst.models.club import Club
import uuid

from django.utils import timezone


def get_alphanumeric_id():
    last_event = Event.objects.order_by("-event_id").first()
    if not last_event:
        return "E000000"
    last_id = int(last_event.event_id[1:])
    return f"E{last_id + 1:06d}"


class Speaker(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    bio = models.TextField()
    image = models.ImageField(upload_to='speaker_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class ScheduleItem(models.Model):
    time = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.time} - {self.title}"


class EventPhoto(models.Model):
    image = models.ImageField(upload_to='event_photos/', blank=True, null=True)
    alt = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.alt or (self.image.name if self.image else 'No Image')



class Event(models.Model):
    event_id = models.CharField(max_length=7, primary_key=True, default=get_alphanumeric_id, editable=False)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    time = models.TimeField(default=timezone.now)
    location = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    highlighted = models.BooleanField(default=False)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    attendees = models.PositiveIntegerField(default=0)
    max_capacity = models.PositiveIntegerField(default=0)
    ticket_price = models.CharField(max_length=50, default="₹0")
    categories = models.JSONField(blank=True, null=True)

    speakers = models.ManyToManyField(Speaker, blank=True)
    schedule = models.ManyToManyField(ScheduleItem, blank=True)
    photos = models.ManyToManyField(EventPhoto, blank=True)

    def __str__(self):
        return f"{self.event_id} - {self.title}"