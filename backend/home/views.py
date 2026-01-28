from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# def index(request):
#     return HttpResponse("this is a home page")

def index(request):
    return render(request,'home/index.html')

def homepage(request):
    peoples=[
        {'name':'vighnesh pawar','age':20},
        {'name':'dhruvi pawar','age':10},
        {'name':'bharati pawar','age':45},
        {'name':'dharmesh pawar','age':48},
        {'name':'yesha pawar','age':15},

    ]

    return render(request,'home/homepage.html',context={'peoples':peoples})

def contact(request):
    return render(request,'home/contact.html',context={'page':'contact'})

def about(request):
    return render(request,'home/about.html',context={'page':'about'})
