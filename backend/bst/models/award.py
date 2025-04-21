from django.db import models

from django.utils import timezone

class Award(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(default=timezone.now)
    type = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.title or ""