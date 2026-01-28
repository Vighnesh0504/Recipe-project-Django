from django.contrib import admin
from foodrecipe.models import *



# Register your models here.
admin.site.register(Recipe)


class Studentview(admin.ModelAdmin):
    list_display = ['student_name', 'student_age', 'department']


admin.site.register(Student, Studentview)
admin.site.register(StudentID)
admin.site.register(Department)
admin.site.register(Subjectmarks)
admin.site.register(Subject)


class reportadmin(admin.ModelAdmin):
    # 1. We use the names of the functions defined below
    list_display = ['get_student_name', 'get_student_department', 'rank', 'data_of_Edited']

    # 2. This function gets the name from the linked Student model
    def get_student_name(self, obj):
        return obj.student.student_name
    get_student_name.short_description = 'Student Name' # Sets column header

    # 3. This function gets the department name
    def get_student_department(self, obj):
        # Adjust 'department_name' if your field in Student model is named differently
        return obj.student.department
    get_student_department.short_description = 'Department'

admin.site.register(reportcard, reportadmin)