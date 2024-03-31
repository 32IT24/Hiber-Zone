from django.shortcuts import render, redirect, reverse
#from .import models,forms
from django.http import HttpResponseRedirect
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required, user_passes_test
from datetime import datetime, timedelta, date
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.views.generic import ListView
from .models import Video
# Create your views here.

def home_page_view(request):
      return render(request, "indexmain.html")

def form_view(request):
      return render(request, "form.html")

def aboutus(request):
      return render(request, "aboutus.html")

def contactus(request):
      return render(request, "contactus.html")

def admin(request):
      return render(request, "adminclick.html")

def client(request):
      return render(request, "clientclick.html")

def therapist(request):
      return render(request, "therapistclick.html")

def recover(request):
      return render(request, "recover.html")

def relax(request):
      return render(request, "relax.html")

def restart(request):
      return render(request, "restart.html")

def journal(request):
      return render(request, "journal.html")


def login_or_signup_view(request):
    if request.method == 'POST':
        if 'login' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('content')  # Redirect to content view after successful login
            else:
                return render(request, 'login.html', {'error': 'Invalid username or password'})
        elif 'signup' in request.POST:
            new_username = request.POST.get('new_username')
            new_password = request.POST.get('new_password')
            email = request.POST.get('email')
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            if User.objects.filter(username=new_username).exists():
                return render(request, 'login.html', {'error': 'Username already exists'})
            else:
                user = User.objects.create_user(username=new_username, password=new_password, email=email, first_name=first_name, last_name=last_name)
                login(request, user)
                return redirect('content')  # Redirect to content view after successful signup
    else:
        return render(request, 'login.html')

class VideoListView(ListView):
    model = Video
  

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['videos'] = Video.objects.all()  # Pass all videos to the context
        return context
        
def content(request):
    selected_filters = request.session.get('selected_filters', [])  # Retrieve selected filters from session

    if request.method == 'GET':
        keyword = request.GET.get('keyword', None)
        if keyword:
            if keyword == 'instagram':
                # Filter videos with Instagram URLs
                videos = Video.objects.filter(video_url__contains='instagram.com')
            else:
                # Filter videos based on other keywords
                videos = Video.objects.filter(description__icontains=keyword)
        elif selected_filters:
            # Filter videos based on selected filters
            videos = Video.objects.filter(description__icontains=selected_filters)
        else:
            videos = Video.objects.all()
    else:
        videos = Video.objects.all()

    return render(request, "content.html", {'videos': videos})




""" def admin_signup_view(request):
      form = forms.AdminSignupForm()
      if request.method == 'POST' :
            form = forms.AdminSignupForm(request.POST)
            if form.is_valid():
                  user = form.save()
                  user.set_password(user.password)
                  user.save()
                  my_admin_group = Group.objects.get_or_create(name='ADMIN')
                  my_admin_group[0].user_set.add(user)
                  return HttpResponseRedirect('/adminlogin/')

      else:
            form = forms.AdminSignupForm() 
      return render(request,'adminsignup.html', {'form':form}) """

def is_admin(user):
      return user.groups.filter(name='ADMIN').exists()

def afterlogin_view(request):
    if is_admin(request.user):
        return redirect(reverse('admin_dashboard'))
    else:
        return redirect('profile')

@login_required(login_url='adminlogin')
@user_passes_test(is_admin)

def admin_dashboard_view(request):
      client = models.client.objects.all().order_by('-id')
      Therapist = models.Therapist.objects.all().order_by('-id')

      clientcount = models.client.objects.all().filter(status=True).count()
      pendingclientcount = models.client.objects.all().filter(status=False).count()

      Therapistcount = models.Therapist.objects.all().filter(status=True).count()
      pendingTherapistcount = models.Therapist.objects.all().filter(status=False).count()

      mydict = {
            'client': client,
            'Therapist': Therapist,
            'clientcount': clientcount,
            'pendingclientcount': pendingclientcount,
            'Therapistcount': Therapistcount,
            'pendingTherapistcount': pendingTherapistcount,
      #add variable names of 3rd table if u have any
      }
      return render(request,'admin_dashboard.html', context=mydict)