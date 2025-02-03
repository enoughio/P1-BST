from django.db import models

from bst.models.club import Club

from accounts.models import Member

from datetime import datetime
import uuid

class Meeting(models.Model):
    meeting_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    agenda = models.CharField(blank=True, null=True)
    schedule = models.DateTimeField(default=datetime.now, blank=True, null=True) # Manually editable
    location = models.TextField(blank=True, null=True)

    club = models.ForeignKey(Club, on_delete=models.CASCADE)

    MOC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="moc_meetings")
    OMC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="omc_meetings")
    CE = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="ce_meetings")
    '''why related_name? becoz, django in sabhi relationships ke liye reverse accessors create karta hai, aur kyunki aapne related_name specify nahi kiya, 
    Django in sabhi ke liye default reverse accessor meeting_set bana dega.
    '''

    created_at = models.DateField(auto_now_add=True, blank=True, null=True) #Sirf first time create hone par date set hogi, baad me change nahi hogi.


    def __str__(self):
        return self.agenda