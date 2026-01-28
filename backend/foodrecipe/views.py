from django.shortcuts import render,redirect
from .models import *
from django.contrib.auth import login,logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Q,Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import status



# Create your views here.
@login_required(login_url='/loginpage/')
def recipe(request):
    if request.method=="POST":
        data=request.POST
        recipe_name=data["recipe_name"]
        ingredients=data["ingredients"]
        recipe=data["recipe"]
        image=request.FILES.get("image")


        Recipe.objects.create(recipe_name=recipe_name,ingredients=ingredients,recipe=recipe,image=image)
        return redirect("/recipe/")

    queryset=Recipe.objects.all()

    if request.GET.get("search"):
        print(request.GET.get("search"))
        queryset=queryset.filter(recipe_name__icontains=request.GET.get("search"))
    context={'recipes':queryset}



    return render(request,'recipe.html',context=context)
@login_required(login_url='/loginpage/')
def delete_recipe(request,id):
    Recipe.objects.get(id=id).delete()
    return redirect("/recipe/")
@login_required(login_url='/loginpage/')
def update_recipe(request,id):
    queryset=Recipe.objects.get(id=id)
    if request.method=="POST":
        data = request.POST
        recipe_name = data["recipe_name"]
        ingredients = data["ingredients"]
        recipe = data["recipe"]

        queryset.recipe_name = recipe_name
        queryset.ingredients = ingredients
        queryset.recipe = recipe
        if request.FILES.get("image"):
            image = request.FILES.get("image")
            queryset.image = image
        queryset.save()

        return redirect("/recipe/")
    context={'recipe':queryset}
    return render(request,'update.html',context=context)


def login_page(request):

    if request.method=='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user=User.objects.filter(username=username)
        if not user:
            messages.info(request,'Invalid username')
            return redirect('/loginpage/')
        user_auth = authenticate(request, username=username, password=password)
        if user_auth is not None:
            login(request, user_auth)
            return redirect('/recipe/')
        else:
            messages.info(request,'Invalid password')
            return redirect('/loginpage/')

    return render(request,'login.html')

def registartion_page(request):
    if request.method=="POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        password = request.POST.get('password')

        user=User.objects.filter(username=username)

        if user:
            messages.info(request,'Username already exists')
            return redirect('/loginpage/')
        User.objects.create_user(username=username,password=password,first_name=first_name,last_name=last_name)

        messages.info(request,'Registration Successful')
        return redirect('/loginpage/')

    return render(request,'registration.html')

def logout_page(request):
    logout(request)
    messages.info(request,'Logout Successful')
    return redirect('/loginpage/')


def get_student(request):

    students=Student.objects.all()
    paginator = Paginator(students, 10)
    page_number = request.GET.get("page",1)
    page_obj = paginator.get_page(page_number)
    search_result=request.GET.get("search")
    if search_result:
        students=Student.objects.filter(Q(student_name__icontains=search_result) | Q(student_email__icontains=search_result) |
                                        Q(student_age__icontains=search_result) | Q(student_address__icontains=search_result) |
                                        Q(student_id__student_id__icontains=search_result) | Q(department__department__icontains=search_result))
        paginator = Paginator(students, 10)
        page_number = request.GET.get("page", 1)
        page_obj = paginator.get_page(page_number)



    return render(request,'student.html',context={'students': page_obj,'search_result':search_result})

def get_marks(request,student_id):
    queryset = Subjectmarks.objects.filter(student__student_id__student_id=student_id)
    totalmarks=queryset.aggregate(Sum('marks'))
    student_report = reportcard.objects.filter(student__student_id__student_id=student_id).first()
    return render(request,'marks.html',context={'marks':queryset,'totalmarks':totalmarks,'report': student_report})


class RecipeAPIGeneral(APIView):
    def get(self, request):
        queryset = Recipe.objects.all()
        if request.GET.get("search"):
             queryset = queryset.filter(recipe_name__icontains=request.GET.get("search"))
        serializer = RecipeSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RecipeAPIDetail(APIView):
    def get_object(self, id):
        try:
            return Recipe.objects.get(id=id)
        except Recipe.DoesNotExist:
            return None
            
    def get(self, request, id):
        recipe = self.get_object(id)
        if not recipe:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)
    
    def delete(self, request, id):
        recipe = self.get_object(id)
        if not recipe:
            return Response(status=status.HTTP_404_NOT_FOUND)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, id):
        recipe = self.get_object(id)
        if not recipe:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


