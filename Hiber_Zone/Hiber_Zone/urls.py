"""
URL configuration for Hiber_Zone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from userapp import views
from userapp.views import VideoListView, content


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_page_view, name=""),
    path('aboutus/', views.aboutus),
    path('contactus/', views.contactus),
    path('adminclick/', views.admin),
    path('clientclick/', views.client),
    path('therapistclick/', views.therapist),
    path('recover/', views.recover),
    path('recover', views.recover, name='recover'),  # No trailing slash
    path('relax', views.relax, name='relax'),        # No trailing slash
    path('restart', views.restart, name='restart'),  # No trailing slash
    path('journal', views.journal, name='journal'),
    path('content', views.content, name='content'),
    path('login_or_signup_view', views.login_or_signup_view, name='login_or_signup'),

]
    # Other paths...







