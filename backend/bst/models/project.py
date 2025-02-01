from django.db import models

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    
    created_at = models.DateField(default='2025-01-01')

    def __str__(self):
        return self.title