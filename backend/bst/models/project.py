from django.db import models
from accounts.models import Member


class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
    

class ProjectHistory(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assigned_date = models.DateTimeField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.member.username} - {self.project.title}"
