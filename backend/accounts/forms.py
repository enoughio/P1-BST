from django import forms
from .models import CustomUser

class UserCreationForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'phone_number', 'address', 'password']

    password = forms.CharField(widget=forms.PasswordInput)

    def save(self, commit=True):
        user = forms.ModelForm.save(commit=False) #super().save(commit=False)
        if commit:
            user.set_password(self.cleaned_data['password'])
            user.save()
        return user
