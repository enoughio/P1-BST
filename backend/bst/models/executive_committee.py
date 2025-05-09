from django.db import models
from accounts.models import Member


from django.db import models

class ExecutiveCommittee(models.Model):
    ROLE_CHOICES = [
        ('President', 'President'),
        ('Vice President - Education', 'Vice President - Education'),
        ('Vice President - Membership', 'Vice President - Membership'),
        ('Vice President - Public Relations', 'Vice President - Public Relations'),
        ('Secretary', 'Secretary'),
        ('Sergeant at Arms', 'Sergeant at Arms'),
    ]

    member = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        default=ROLE_CHOICES[0][0]
    )

    def __str__(self):
        member_name = self.member.get_full_name() if self.member else "Unassigned"
        club_name = self.member.club.club_name if self.member else "No Club"
        role_display = self.role
        return f"{member_name} — {role_display} ({club_name})"
