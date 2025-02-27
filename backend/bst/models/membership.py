from django.db import models


import uuid

def get_alphanumeric_id():
    return (uuid.uuid4().hex).upper()[:4]

class Membership(models.Model):
    id = models.CharField(max_length=4, primary_key=True, default=get_alphanumeric_id, editable=False)
    name = models.CharField(max_length=150, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Better price handling
    duration_in_months = models.IntegerField(default=6)

    def __str__(self):
        return f"{self.name} - {self.duration_in_months} months - ₹{self.price}"