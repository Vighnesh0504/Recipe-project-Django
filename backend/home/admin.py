from django.contrib import admin
from home.models import Student

# Register your models here.
# class StudentAdmin(admin.ModelAdmin):
#     list_display = ('name','age','Email','address')
#     search_fields=('name','Email')
#     filter_fields=('age')
#     list_per_page=1
#     list_editable=('age','Email')

# class StudentAdmin(admin.ModelAdmin):
#     fieldsets = (
#         ('Personal Info', {
#             'fields': ('name', 'Email')
#         }),
#         ('Other Details', {
#             'fields': ('age',)
#         }),
#     )

def mark_adult(modeladmin, request, queryset):
    queryset.update(age=18)

mark_adult.short_description = "Mark selected students as adult"

class StudentAdmin(admin.ModelAdmin):
    actions = [mark_adult]




admin.site.register(Student, StudentAdmin)

