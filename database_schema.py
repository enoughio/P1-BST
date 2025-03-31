from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    """
    Custom user model extending Django's AbstractUser
    Used for authentication for all users (members, club admins, super admins)
    """
    USER_TYPE_CHOICES = (
        ('member', 'Member'),
        ('club_admin', 'Club Admin'),
        ('super_admin', 'Super Admin'),
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='member')
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    def __str__(self):
        return self.username

class Club(models.Model):
    """
    Club model representing a Toastmasters club
    """
    name = models.CharField(max_length=100)
    address = models.TextField()
    city = models.CharField(max_length=100)
    meeting_time = models.CharField(max_length=100)  # e.g., "Tuesdays, 6:30 PM"
    position_lat = models.FloatField(blank=True, null=True)
    position_long = models.FloatField(blank=True, null=True)
    dms_position = models.CharField(max_length=100, blank=True, null=True)  # Degrees, Minutes, Seconds format
    description = models.TextField()
    image = models.ImageField(upload_to='club_images/', blank=True, null=True)
    admin = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='administered_clubs')
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    @property
    def members_count(self):
        return self.members.count()

class Member(models.Model):
    """
    Member model extending CustomUser with Toastmasters member specific fields
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='member_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    id_proof = models.CharField(max_length=100, blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='members')
    occupation = models.CharField(max_length=100, blank=True, null=True)
    membership_expiry_date = models.DateField()
    join_date = models.DateField()
    bio = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_active_member(self):
        from datetime import date
        return self.membership_expiry_date >= date.today()

class Event(models.Model):
    """
    Events organized by clubs (workshops, competitions, conferences, etc.)
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    long_description = models.TextField(blank=True, null=True)
    date = models.DateField()
    formatted_date = models.CharField(max_length=100, blank=True, null=True)  # For display purposes
    time = models.CharField(max_length=100)  # e.g., "6:00 PM - 9:00 PM"
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    highlighted = models.BooleanField(default=False)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events')
    max_capacity = models.PositiveIntegerField(default=100)
    ticket_price = models.CharField(max_length=100, blank=True, null=True)  # Could be a range or "Free"
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    @property
    def attendees_count(self):
        return self.attendees.count()
    
    class Meta:
        ordering = ['-date']

class EventCategory(models.Model):
    """
    Categories for events (e.g., Workshop, Competition, etc.)
    """
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class EventCategoryRelation(models.Model):
    """
    Many-to-many relationship between events and categories
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='category_relations')
    category = models.ForeignKey(EventCategory, on_delete=models.CASCADE, related_name='event_relations')
    
    class Meta:
        unique_together = ('event', 'category')

class EventSpeaker(models.Model):
    """
    Speakers or performers for events
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='speakers')
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='speaker_images/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} - {self.event.title}"

class EventScheduleItem(models.Model):
    """
    Schedule items for events
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='schedule_items')
    time = models.CharField(max_length=100)  # e.g., "6:00 PM - 6:30 PM"
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.event.title} - {self.title}"

class EventPhoto(models.Model):
    """
    Photos from past events
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='event_photos/')
    alt = models.CharField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return f"Photo for {self.event.title}"

class EventAttendee(models.Model):
    """
    Attendees who have registered for events
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attendees')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    ticket_number = models.CharField(max_length=100, unique=True)
    registration_date = models.DateTimeField(auto_now_add=True)
    is_member = models.BooleanField(default=False)
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True, related_name='event_registrations')
    
    def __str__(self):
        return f"{self.name} - {self.event.title}"

class Meeting(models.Model):
    """
    Regular club meetings
    """
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.CharField(max_length=100)  # e.g., "6:30 PM - 8:30 PM"
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='meetings')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} - {self.date}"
    
    class Meta:
        ordering = ['-date']

class MeetingRole(models.Model):
    """
    Roles for a meeting (e.g., Toastmaster, Speaker, Evaluator)
    """
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, related_name='roles')
    role = models.CharField(max_length=100)
    assigned_to = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True, related_name='meeting_roles')
    
    def __str__(self):
        return f"{self.role} at {self.meeting.title}"

class Project(models.Model):
    """
    Speech projects for members to complete
    """
    title = models.CharField(max_length=200)
    description = models.TextField()
    level = models.CharField(max_length=50)  # e.g., "Level 1", "Level 2"
    path = models.CharField(max_length=100, blank=True, null=True)  # e.g., "Presentation Mastery"
    assigned_to = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_projects')
    status = models.CharField(max_length=50, default="Not Started")  # Not Started, In Progress, Completed
    completed_date = models.DateField(blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    expected_completion_date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class ProjectObjective(models.Model):
    """
    Objectives for a project
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='objectives')
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"Objective for {self.project.title}"

class ProjectResource(models.Model):
    """
    Resources for a project (PDFs, templates, etc.)
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=200)
    file_type = models.CharField(max_length=50)  # e.g., "PDF", "DOCX"
    file = models.FileField(upload_to='project_resources/')
    
    def __str__(self):
        return f"{self.title} for {self.project.title}"

class ProjectEvaluation(models.Model):
    """
    Evaluations for completed projects
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='evaluations')
    evaluator = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, related_name='evaluations_given')
    date = models.DateField()
    comments = models.TextField()
    
    def __str__(self):
        return f"Evaluation for {self.project.title}"

class Request(models.Model):
    """
    Requests from club admins to super admins
    """
    REQUEST_TYPES = (
        ('MemberRemoval', 'Member Removal'),
        ('FreezeClub', 'Freeze Club'),
        ('EventCancellation', 'Event Cancellation'),
        ('Other', 'Other'),
    )
    
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    
    type = models.CharField(max_length=50, choices=REQUEST_TYPES)
    requested_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='requests_made')
    requested_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='requests')
    details = models.JSONField()  # Flexible JSON field to store different request details
    response_notes = models.TextField(blank=True, null=True)
    responded_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='requests_handled')
    response_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.type} Request from {self.club.name}"
    
    class Meta:
        ordering = ['-requested_date']

