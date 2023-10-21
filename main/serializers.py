from dataclasses import fields
from pyexpat import model
from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail
from rest_framework import serializers
from .models import AttemptQuiz, Chapter, Contact, Course, CourseQuiz, CourseRating, FaQ, Notification, QuizQuestion, Student, StudentAssignement, StudentCourseEnrollment, StudentFavoriteCourse, StudyMaterial, Teacher , CoursCategory,Quiz, TeacherStudentChat


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=["id",
                "full_name",
                "detail",
                "email",
                "password",
                "qualification",
                "mobile_no",
                "Skills",
                "profile_img",
                'teacher_courses',
                'skill_list',
                'total_teacher_courses',
                "verify_status",
                "otp_digit",
                "login_via_otp",
                "facebook_url",
                "twitter_url",
                "instagram_url",
                "website_url",
                ]
    def __init__(self , *args , **kwargs):
        super(TeacherSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1
    def create(self, validate_data):
        email=self.validated_data["email"]
        otp_digit=self.validated_data["otp_digit"]
        instance=super(TeacherSerializer , self).create(validate_data)
        send_mail(
            'Contact Query',
            'Please verify your count',
            'djibrilbarry1011@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
        )
        return instance     
                                                               
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher 
        fields=['total_teacher_courses','total_teacher_chapters','tatal_teacher_students']
               
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=CoursCategory
        fields=["id","title","description" , "total_courses"]
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=["id","category",'teacher','title','description','featured_img','techs','course_chapters','related_videos','tech_list' , "total_enrolled_students", "course_rating","course_views"]
    def __init__(self , *args , **kwargs):
        super(CourseSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chapter
        fields=["id","course","title","description","video","remarks"]
        
    def __init__(self , *args , **kwargs):
        super(ChapterSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1
         
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=["id",
                "full_name",
                "email",
                "password",
                "username",
                "interested_categories",
                "profile_img",
                "verify_status",
                "otp_digit",
                "login_via_otp"]
    def __init__(self , *args , **kwargs):
        super(StudentSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1 
    def create(self, validate_data):
        email=self.validated_data["email"]
        otp_digit=self.validated_data["otp_digit"]
        instance=super(StudentSerializer , self).create(validate_data)
        send_mail(
            'Contact Query',
            'Please verify your count',
            'djibrilbarry1011@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
        )
        return instance  
class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student 
        fields=['enrolled_courses','favorite_courses','complete_assignment' , 'pending_assignment']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentCourseEnrollment
        fields=["id", "course" ,"student" ,"enrolled_time"]
 
    def __init__(self , *args , **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=2

class StudentCourseEnrollAddSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentCourseEnrollment
        fields=["id", "course" ,"student" ,"enrolled_time"]

class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentFavoriteCourse
        fields=["id", "course","student", "status"]
    def __init__(self , *args , **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=2
            
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseRating
        fields=["id","course","student","rating","reviews","review_time"]
        
    def __init__(self , *args , **kwargs):
        super(CourseRatingSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1

class StudentAssignementSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentAssignement
        fields=['id','teacher','student','title','detail','student_status','add_time']
    def __init__(self , *args , **kwargs):
        super(StudentAssignementSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notification
        fields=['id' , 'teacher', 'student' , 'notif_subject' , 'notif_for','notif_read_status']


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields=["id", "teacher", "title", "detail","assign_quiz","add_time"]

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=QuizQuestion
        fields=["id", "quiz","question", "ans1" , "ans2", "ans3", "ans4", "right_ans", "add_time"]
        
    def __init__(self, *args, **kwargs):
        super(QuizQuestionSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1
        
class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseQuiz
        fields=["id","teacher","quiz", "course" ,  "add_time"]
        
    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=2
            
class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=AttemptQuiz
        fields=["id","student","quiz","question","right_ans","add_time"]
        
    def __init__(self, *args, **kwargs):
        super(AttemptQuizSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=2
            
class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudyMaterial
        fields=["id","course","title","description","upload","remarks"]
    def __init__(self , *args , **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args , **kwargs)
        request = self.context.get("request")
        self.Meta.depth=0
        if request and request.method == "GET":
            self.Meta.depth=1 
            
class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model=FaQ
        fields=["id" ,"question" , "answer"]

class FlatPagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=FlatPage
        fields=["id", "title" , "content", "url"]
        
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields=["id", "full_name" , "email" , "query_txt", "add_time"]

class TeacherStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        model=TeacherStudentChat
        fields=["id", "teacher" , "student" , "msg_text" , "msg_from" , "msg_time"]
    
    def to_representation(self, instance):
        representation=super(TeacherStudentChatSerializer , self).to_representation(instance)
        representation['msg_time']=instance.msg_time.strftime("%Y-%m-%d %H:%M")
        return representation