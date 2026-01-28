"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path

from django.conf.urls.static import static
from django.conf import settings

from home.views import *
from foodrecipe.views import *


urlpatterns = [
    path('',homepage,name='homepage'),
    path('index/',index,name='index'),
    path('about/',about,name='about'),
    path('contact/',contact,name='contact'),
    path('recipe/',recipe,name='recipe'),
    path('deleterecipe/<id>/',delete_recipe,name="delete_recipe"),
    path('updaterecipe/<id>/',update_recipe,name='update_recipe'),
    path('loginpage/',login_page,name="login_page"),
    path('registration/',registartion_page,name="registartion_page"),
    path('logout/',logout_page,name="logout_page"),
    path('getstudent/',get_student,name="getstudent"),
    path('getmarks/<student_id>/',get_marks,name="getmarks"),
    
    path('api/recipes/', RecipeAPIGeneral.as_view(), name='recipe-api-general'),
    path('api/recipes/<id>/', RecipeAPIDetail.as_view(), name='recipe-api-detail'),

    path("admin/", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)