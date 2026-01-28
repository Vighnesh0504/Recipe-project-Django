from faker import Faker
from .models import *
from django.db import Sum
import random
fake=Faker()


# def seed_db(n=10)->None:
#     try:
#         for i in range(n):
#
#             student_name=fake.name()
#             student_email=fake.email()
#             student_age=random.randint(15,30)
#             student_address=fake.address()
#
#             department_obj=Department.objects.all()
#             random_idx=random.randint(0,len(department_obj)-1)
#             department=department_obj[random_idx]
#
#             studentid=f'STU-0{random.randint(100,999)}'
#
#             studentid_obj=StudentID.objects.create(student_id=studentid)
#
#             Student.objects.create(
#                 student_id=studentid_obj,
#                 student_name=student_name,
#                 student_email=student_email,
#                 student_age=student_age,
#                 student_address=student_address,
#                 department=department
#             )
#     except Exception as e:
#         print(e)

import random
from foodrecipe.models import Student, Subject, Subjectmarks


def assign_random_marks():
    students = Student.objects.all()
    subjects = Subject.objects.all()

    for student in students:
        for subject in subjects:
            # get_or_create prevents duplicate entries if you run this twice
            subject_mark, created = Subjectmarks.objects.get_or_create(
                student=student,
                Subject=subject,
                defaults={'marks': random.randint(30, 100)}  # Initial random marks
            )

            # If the record already existed, update it with a new random number
            if not created:
                subject_mark.marks = random.randint(30, 100)
                subject_mark.save()

    print(f"Successfully assigned random marks to {students.count()} students!")



def addrank():
    ranks=Student.objects.annotate(marks=Sum('marks')).order_by('-marks')
    currentrank=-1
    i=1
    for rank in ranks:
        reportcard.objects.create(student=rank,rank=i)
        i=i+1
