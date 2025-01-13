from django.shortcuts import render, redirect

from django.views.generic import TemplateView

from .forms import UserCreationForm
from django.contrib.auth import login, logout

# Create your views here.
class HomeView(TemplateView):
    template_name = "base.html"


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request=request, user=user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


def logout_user(request):
    logout(request.user)   
    return redirect('home')
