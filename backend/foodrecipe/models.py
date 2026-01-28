from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Recipe(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    recipe_name=models.CharField(max_length=200)
    ingredients=models.TextField()
    recipe=models.TextField()
    image=models.ImageField(upload_to='recipeimages/')

class Department(models.Model):
    department=models.CharField(max_length=200)

    def __str__(self):
        return self.department

class StudentID(models.Model):
    student_id=models.CharField(max_length=200)

    def __str__(self):
        return self.student_id


class Student(models.Model):
    department= models.ForeignKey(Department,on_delete=models.CASCADE,null=True,blank=True)
    student_id=models.OneToOneField(StudentID,related_name='studentid',on_delete=models.CASCADE,null=True,blank=True)
    student_name=models.CharField(max_length=200)
    student_email=models.EmailField(max_length=200)
    student_age=models.IntegerField(default=18)
    student_address=models.TextField()

    def __str__(self):
        return self.student_name

    class Meta:
        ordering=['student_name']
        verbose_name='Student'

class Subject(models.Model):
    subject_name=models.CharField(max_length=200)
    def __str__(self):
        return self.subject_name


class Subjectmarks(models.Model):
    student=models.ForeignKey(Student,related_name='studentmarks',on_delete=models.CASCADE,null=True,blank=True)
    Subject=models.ForeignKey(Subject,on_delete=models.CASCADE)
    marks=models.IntegerField()

    def __str__(self)->str:
        return f'{self.student.student_name}: {self.Subject.subject_name}'


class reportcard(models.Model):
    student=models.ForeignKey(Student,related_name='studentreport',on_delete=models.CASCADE,null=True,blank=True)
    rank=models.IntegerField()
    data_of_Edited=models.DateField(auto_now_add=True)