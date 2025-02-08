from django.db import models

import uuid

class Club(models.Model):
    club_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    club_name = models.CharField(max_length=255, default='Bharat Storytellers')
    street = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    area = models.CharField(max_length=100, blank=True, null=True)
    landmark = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.club_name