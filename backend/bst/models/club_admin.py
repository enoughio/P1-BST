from django.db import models

from accounts.models import User

from bst.models.club import Club

class Admin(User):
    club = models.ForeignKey(Club, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins" # Yeh admin panel mein plural name define karega

    def __str__(self):
        if self.is_superuser:
            return f"(SuperAdmin) - {self.username}"
        return f"(Admin) - {self.username}"