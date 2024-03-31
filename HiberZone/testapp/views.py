from django.shortcuts import render

from django.http import HttpResponse
# Create your views here.

from django.urls import reverse

def index(req):
    return HttpResponse("<h1> this is my first django page</h1><a href='/index.html'>Click here</a>")
   

def NA(req):
    return HttpResponse("<h1> In progress</h1>")


def Home(r):
    context={
    "li":[1,2,3,4,5,6,7,8,9],
    
    }
    
    return render (r, "index.html", context)
    
def Menu(e):
    context={
    "li": [{"text":"Home","url":"/Home"}, 'About','Contact', 'Help', 'Services'],
    "name": "Menu",
    }
    
    return render (e, "home.html", context)

def About(a):
    context={
    "li": [13,14,15],
    }

    return render (a, "index.html", context)


def Services(k):
    context={
    "li": [13,14,15],
    }

    return render (k, "index.html", context)


def Contact(c):
    context={
    "li": [13,14,15],
    }

    return render (c, "index.html", context)

