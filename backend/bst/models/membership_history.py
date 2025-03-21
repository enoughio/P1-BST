from django.db import models

from accounts.models import Member
from bst.models import membership

from django.utils.timezone import now
from datetime import timedelta

class MembershipHistory(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    membership_type = models.ForeignKey(membership.Membership, on_delete=models.CASCADE)
    start_date = models.DateField(blank=True, null=True, default=now)
    end_date = models.DateField(blank=True, null=True, editable=False)

    def save(self, *args, **kwargs):
        if self.start_date and self.membership_type:
            self.end_date = self.start_date + timedelta(days=self.membership_type.duration_in_months * 30)
        super().save(*args, **kwargs)
