from django.db import models

import uuid


'''
>>> print((uuid.uuid4() 
ad7279ab-6b55-4a67-86be-b17208782871

but, 
>>> print((uuid.uuid4().hex)
fd064bbc04c74399b7f2e8a9214668a0

>>> print((uuid.uuid4().hex).upper())
C9A26C263AAE4B13AF8DA7238C56B1E2
'''

def get_alphanumeric_id():
    last_club = Club.objects.order_by("-club_id").first()
    if not last_club:
        return "C0000"
    
    last_id = int(last_club.club_id[1:])
    return f"C{last_id + 1:04d}"


class Club(models.Model):
    club_id = models.CharField(max_length=5, primary_key=True, default=get_alphanumeric_id, editable=False)
    club_name = models.CharField(max_length=255, default='Bharat Storytellers')
    street = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    landmark = models.CharField(max_length=100, blank=True, null=True)


    def __str__(self):
        return self.club_name
    

    def full_address(self):
        address_parts = [self.street, self.city, self.state, self.postal_code, self.country]
        return ", ".join(filter(None, address_parts))   # Filter removes empty values