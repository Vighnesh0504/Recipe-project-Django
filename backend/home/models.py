from django.db import models

# Create your models here.
class Student(models.Model):
    name=models.CharField(max_length=20)
    age=models.IntegerField(default=18)
    Email=models.EmailField(max_length=50)
    phone=models.IntegerField(default=0)
    address=models.TextField()
    image=models.ImageField(upload_to='images/')
    file=models.FileField()

    def __str__(self):
        return self.name
