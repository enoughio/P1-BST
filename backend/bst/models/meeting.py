from django.db import models

from bst.models.club import Club

from accounts.models import Member

from datetime import datetime

from django.core.exceptions import ValidationError


def get_alphanumeric_id():
    last_club = Club.objects.order_by("-club_id").first()
    if not last_club:
        return "M00000"
    
    last_id = int(last_club.club_id[1:])
    return f"M{last_id + 1:05d}"    # 6-digit consistent rkhne keLiye



class Meeting(models.Model):
    # meeting_id = models.CharField(max_length=3, primary_key=True, default=random.randint(100, 999), editable=False)
    meeting_id = models.CharField(max_length=6, primary_key=True, default=get_alphanumeric_id, editable=False)
    agenda = models.CharField(blank=True, null=True)
    schedule = models.DateTimeField(default=datetime.now, blank=True, null=True) # Manually editable
    
    @property
    def location(self):
        return self.club.full_address()

    club = models.ForeignKey(Club, on_delete=models.CASCADE)

    MOC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="moc_meetings")
    OMC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="omc_meetings")
    CE = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="ce_meetings")
    '''why related_name? becoz, django in sabhi relationships ke liye reverse accessors create karta hai, aur kyunki aapne related_name specify nahi kiya, 
    Django in sabhi ke liye default reverse accessor meeting_set bana dega.
    '''

    created_at = models.DateField(auto_now_add=True, blank=True, null=True) #Sirf first time create hone par date set hogi, baad me change nahi hogi.


    def clean(self):
        if self.MOC and self.MOC.club != self.club:
            raise ValidationError("MOC must belong to the selected club.")
        if self.OMC and self.OMC.club != self.club:
            raise ValidationError("OMC must belong to the selected club.")
        if self.CE and self.CE.club != self.club:
            raise ValidationError("CE must belong to the selected club.")
        
    
    def save(self, *args, **kwargs):
        """ Calling clean() before saving the model to enforce validation """
        self.clean()
        super(Meeting, self).save(*args, **kwargs)


    def __str__(self):
        return self.agenda