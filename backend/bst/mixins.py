from django.core.mail import send_mail
from django.conf import settings

class RoleAssignmentNotificationMixin:
    def track_and_notify_roles(self, instance, old_data: dict, role_fields: list):
        instance.refresh_from_db()
        
        for role_name in role_fields:
            new_member = getattr(instance, role_name)
            old_member = old_data.get(role_name)
            if new_member and new_member != old_member:
                self.send_assignment_email(new_member, role_name, instance)

    def send_assignment_email(self, member, role_name, meeting_instance):
        subject = f"You have been assigned as {role_name.replace('_', ' ').title()}"
        message = (
            f"Hello {member.get_full_name()},\n\n"
            f"You have been assigned as *{role_name.replace('_', ' ').title()}* for the upcoming meeting.\n"
            f"📅 Date: {meeting_instance.date}\n"
            f"🕒 Time: {meeting_instance.start_time} - {meeting_instance.end_time}\n"
            f"🏠 Location: {meeting_instance.location}\n\n"
            f"Please be prepared accordingly.\n\nThanks!"
        )
        print("Sending email to:", member.email)
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [member.email],
            fail_silently=False
        )
