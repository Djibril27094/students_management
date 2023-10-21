from pyexpat import model
from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Teacher)
admin.site.register(models.CoursCategory)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Student)
admin.site.register(models.StudentCourseEnrollment)
admin.site.register(models.CourseRating)
admin.site.register(models.StudentFavoriteCourse)
admin.site.register(models.StudentAssignement)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id','notif_subject', 'notif_for' , 'notif_read_status']
admin.site.register(models.Notification)
admin.site.register(models.Quiz)
admin.site.register(models.QuizQuestion)
admin.site.register(models.CourseQuiz)
admin.site.register(models.AttemptQuiz)
admin.site.register(models.StudyMaterial)
admin.site.register(models.FaQ)
admin.site.register(models.TeacherStudentChat)

