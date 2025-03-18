from django.db import models

from bst.models.event import Event
from accounts.models import User


def get_alphanumeric_id():
    last_evnt_reg = EventRegistration.objects.order_by('-reg_id').first()
    if not last_evnt_reg:
        return "reg_000000"
    last_reg_id = int(last_evnt_reg.reg_id[4:])
    return f"reg_{last_reg_id + 1:6d}"


class EventRegistration(models.Model):
    
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other")
    ]

    OCCUPATION_CHOICES = [
        ('Student', 'Student'),
        ('Employee', 'Employeed'),
        ('Business', 'Business'),
        ('Self Employeed', 'Self Employeed'),
    ]
    
    reg_id = models.CharField(max_length=10, primary_key=True, default=get_alphanumeric_id, editable=False)
    event = models.ForeignKey(Event, related_name="event_model", on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True,  null=True)
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="Male")
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES, default=OCCUPATION_CHOICES[0][0])
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, editable=False)    # for auto-fill


    def __str__(self):
        return self.registration_id
    

    def save(self, *args, **kwargs):
        if self.price == 0.00:
            self.price = self.event.price
        super().save(*args, **kwargs)




class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('CREATED', 'Created'),
        ('CAPTURED', 'Captured'),
        ('FAILED', 'Failed'),
    ]
    
    registration = models.OneToOneField(EventRegistration, on_delete=models.CASCADE, related_name='payment')
    payment_id = models.CharField(max_length=100, blank=True, null=True)
    order_id = models.CharField(max_length=100, blank=True, null=True)
    signature = models.CharField(max_length=200, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='CREATED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.id} - {self.status}"


    
    # user = models.ForeignKey(User, related_name="event_user", on_delete=models.CASCADE)
