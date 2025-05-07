from django.db import models

from bst.models.club import Club
from accounts.models import Member

from django.utils import timezone
from django.core.exceptions import ValidationError

class Meeting(models.Model):

    MEETING_TYPE_CHOICES = [
        ('Weekly', 'Weekly'),
        ('Executive Committee', 'Executive Committee'),
    ]

    meeting_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(default=timezone.now)
    start_time = models.TimeField(default=timezone.now)
    end_time = models.TimeField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True, null=True)
    
    @property
    def location(self):
        return self.club.full_address()

    club = models.ForeignKey(Club, on_delete=models.CASCADE)


    meeting_type = models.CharField(
        max_length=50,
        choices=MEETING_TYPE_CHOICES,
        default='Weekly'
    )

    MOC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="moc_meetings")
    OMC = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="omc_meetings")
    # CE = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="ce_meetings")
    '''why related_name? becoz, django in sabhi relationships ke liye reverse accessors create karta hai, aur kyunki aapne related_name specify nahi kiya, 
    Django in sabhi ke liye default reverse accessor meeting_set bana dega.
    '''

    # Role-wise Member assignments
    moderator = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="moderator_meetings")
    coordinator = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="coordinator_meetings")
    timekeeper = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="timekeeper_meetings")
    listener = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="listener_meetings")
    filler_counter = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="filler_counter_meetings")

    # Speakers
    speaker1 = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="speaker1_meetings")
    speaker2 = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="speaker2_meetings")
    speaker3 = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="speaker3_meetings")

    # Evaluators
    speech_evaluator1 = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="speech_evaluator1_meetings")
    speech_evaluator2 = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="speech_evaluator2_meetings")

    # Executive roles
    president = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="president_meetings")
    vice_president_education = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="vpe_meetings")
    vice_president_membership = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="vpm_meetings")
    vice_president_public_relations = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="vppr_meetings")
    secretary = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="secretary_meetings")
    sergeant_at_arms = models.ForeignKey(Member, on_delete=models.SET_NULL, blank=True, null=True, related_name="saa_meetings")

    # Metadata
    created_at = models.DateField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.title