from multiprocessing import context
from pyexpat import model
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse , HttpResponse
from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail

from django.db.models import Q
from rest_framework import generics , permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from main.serializers import AttemptQuizSerializer, ChapterSerializer, ContactSerializer, CourseQuizSerializer, CourseRatingSerializer, CourseSerializer, FaqSerializer, FlatPagesSerializer, NotificationSerializer, QuizQuestionSerializer, QuizSerializer, StudentAssignementSerializer, StudentCourseEnrollAddSerializer, StudentCourseEnrollSerializer, StudentDashboardSerializer, StudentFavoriteCourseSerializer, StudentSerializer, StudyMaterialSerializer, TeacherDashboardSerializer, TeacherSerializer , CategorySerializer, TeacherStudentChatSerializer
from main.models import Contact, Student, Teacher, TeacherStudentChat
from . import models

from random import randint

class StandardResultsSetPagination(PageNumberPagination):
    page_size=4
    page_size_query_param = 'page_size'
    max_page_size = 4

class TeacherList(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    
class PopularTeacherList(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    
    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT  *, COUNT(c.id) as total_course FROM main_teacher as t INNER JOIN\
                main_course as c ON c.teacher_id=t.id GROUP BY t.id ORDER BY total_course desc"
            return models.Teacher.objects.raw(sql)        
    # permission_classes = [permissions.IsAuthenticated]
class TeacherDashboard(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

@csrf_exempt
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(email=email,password=password)
    except models.Teacher.DoesNotExist:
        teacherData = None
    if  teacherData:
        if not teacherData.verify_status:
            return JsonResponse({'bool':False,'msg':"Account is not verified"})
        else:
            if teacherData.login_via_otp:
                otp_digit=randint(10000,999999)
                send_mail(
                    'Contact Query',
                    'Please verify your count',
                    'djibrilbarry1011@gmail.com',
                    [teacherData.email],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
                )
                teacherData.otp_digit = otp_digit
                teacherData.save()
                return JsonResponse({'bool': True,"teacher_id":teacherData.id , "login_via_otp":True})
            else:    
                return JsonResponse({'bool': True,"teacher_id":teacherData.id ,  "login_via_otp":False})
    else:
        return JsonResponse({'bool': False , 'msg':"Invalid email or password"})

@csrf_exempt
def verify_teacher_via_otp(request , teacher_id):
    otp_digit=request.POST["otp_digit"]
    verify=models.Teacher.objects.filter(id=teacher_id , otp_digit=otp_digit).first()
    if verify:
        models.Teacher.objects.filter(id=teacher_id , otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse ({'bool': True , 'teacher_id':verify.id })
    else:
        return JsonResponse({'bool': False , 'msg':"Please enter valid 6 digit"})
@csrf_exempt
def teacher_change_password(request , teacher_id):
    password=request.POST['password']
    try:
        teacherData=models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None
    
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True , "msg":"Password has been changed"})
    else:
        return JsonResponse({'bool':False, "msg":"Oups ... Some Error occured"})

@csrf_exempt
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = models.Student.objects.get(email=email,password=password)
    except models.Student.DoesNotExist:
        studentData = None
    if  studentData:
        if not studentData.verify_status:
            return JsonResponse({'bool':False,'msg':"Account is not verified"})
        else:
            if studentData.login_via_otp:
                otp_digit=randint(10000,999999)
                send_mail(
                    'Contact Query',
                    'Please verify your count',
                    'djibrilbarry1011@gmail.com',
                    [studentData.email],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
                )
                studentData.otp_digit = otp_digit
                studentData.save()
                return JsonResponse({'bool': True,"student_id":studentData.id , "login_via_otp":True})
            else:    
                return JsonResponse({'bool': True,"student_id":studentData.id ,  "login_via_otp":False})
    else:
        return JsonResponse({'bool': False , 'msg':"Invalid email or password"})
        
@csrf_exempt
def verify_student_via_otp(request , student_id):
    otp_digit=request.POST["otp_digit"]
    verify=models.Student.objects.filter(id=student_id , otp_digit=otp_digit).first()
    if verify:
        models.Student.objects.filter(id=student_id , otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool': True , 'student_id':verify.id})
    else:
        return JsonResponse({'bool': False})
@csrf_exempt
def student_change_password(request , student_id):
    password=request.POST['password']
    try:
        studentData=models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData=None
    
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


# Course category
class CategoryList(generics.ListCreateAPIView):
    queryset=models.CoursCategory.objects.all()
    serializer_class=CategorySerializer

 
# Course list
class CourseList(generics.ListCreateAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
    pagination_class=StandardResultsSetPagination
        
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit = int(self.request.GET['result']) 
            qs = models.Course.objects.all().order_by('-id')[:limit]
        if 'category_id' in self.request.GET:
            category_id=self.request.GET['category_id']
            category=models.CoursCategory.objects.filter(id=category_id).first()
            qs=models.Course.objects.filter(category=category)
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=models.Teacher.objects.filter(id=teacher).first()
            qs=models.Course.objects.filter(techs__icontains=skill_name,teacher=teacher)
        elif 'studentId' in self.kwargs:
            student_id=self.kwargs["studentId"]
            student=models.Student.objects.get(pk=student_id)
            queries=[Q(techs__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries :
                query |= item
            qs = models.Course.objects.filter(query)
        elif "searchstring" in self.kwargs:
            search=self.kwargs["searchstring"]
            qs=models.Course.objects.filter(Q(techs__icontains=search)|Q(title__icontains=search))
        return qs
    
class CourseDetailView(generics.RetrieveAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
# Specific teacher course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)
    
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

    
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    
    
    # def  get_serializer_context(self):
    #     context=super().get_serializer_context()
    #     context['chapter_duration']=self.chapter_duration
    #     return context
    
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

# Student

class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer

class StudentDashboard(generics.RetrieveAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentDashboardSerializer
    
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
    
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollAddSerializer

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavoriteCourse.objects.all()
    serializer_class=StudentFavoriteCourseSerializer
    
    def get_queryset(self):
        
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()  

def fetch_favorite_status(request ,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
def remove_favorite_course(request, student_id , course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favoriteStatus=models.StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_enroll_status(request , student_id , course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course,student=student)
    
    if enrollStatus:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})

class EnrolledStudentList(generics.ListAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs["course_id"]
            course=models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs["teacher_id"]
            teacher=models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs["student_id"]
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()


class CourseRatingList(generics.ListCreateAPIView):
    serializer_class=CourseRatingSerializer
    
    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as\
                c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc LIMIT 4"
            return models.CourseRating.objects.raw(sql)
        if 'all' in self.request.GET:
            sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as\
                c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc"
            return models.CourseRating.objects.raw(sql)
        return models.CourseRating.objects.filter(course__isnull=False).order_by('-rating')
        
def fetch_student_status(request , student_id , course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course,student=student)
    
    if ratingStatus:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
    
class AssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignement.objects.all()
    serializer_class=StudentAssignementSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        teacher_id=self.kwargs['teacher_id']
        student=models.Student.objects.get(pk=student_id)
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignement.objects.filter(student=student,teacher=teacher)

class MyAssignmentList(generics.ListCreateAPIView):
    queryset=models.StudentAssignement.objects.all()
    serializer_class=StudentAssignementSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=models.Student.objects.get(pk=student_id)
        # update Notification
        models.Notification.objects.filter(student=student,notif_subject='assignment',notif_for='student').update(notif_read_status=True)
        return models.StudentAssignement.objects.filter(student=student)
    
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudentAssignement.objects.all()
    serializer_class=StudentAssignementSerializer
    
class NotificationList(generics.ListCreateAPIView):
    queryset=models.Notification.objects.all()
    serializer_class=NotificationSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=models.Student.objects.get(pk=student_id)
        return models.Notification.objects.filter(student=student,notif_subject='assignment',notif_for='student' ,  notif_read_status=False)
    
# Quiz
class QuizList(generics.ListCreateAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs["teacher_id"]
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher=teacher)
    
class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer
    

class QuizQuestionList(generics.ListCreateAPIView):
    queryset=models.QuizQuestion.objects.all()
    serializer_class=QuizQuestionSerializer
    
    def get_queryset(self):
        
        quiz_id = self.kwargs['quiz_id']
        quiz = models.Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizQuestion.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
            return models.QuizQuestion.objects.filter(quiz=quiz,id__gt=current_question).order_by("id")[:1]
        else:
            return models.QuizQuestion.objects.filter(quiz=quiz)
    
class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.QuizQuestion.objects.all()
    serializer_class=QuizQuestionSerializer
    
class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs: 
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)
        
def fetch_quiz_assign_status(request , quiz_id,course_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})


class AttemptQuizList(generics.ListCreateAPIView):
    queryset=models.AttemptQuiz.objects.all()
    serializer_class=AttemptQuizSerializer
    
    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id=self.kwargs['quiz_id']
            quiz = models.Quiz.objects.get(pk=quiz_id) 
            return models.AttemptQuiz.objects.raw(f'SELECT * FROM main_attemptquiz WHERE quiz_id={int(quiz_id)} GROUP BY student_id')       
def fetch_quiz_attempt_status(request , quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    assignStatus=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    if assignStatus:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})

def fetch_quiz_result(request , quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    total_questions=models.QuizQuestion.objects.filter(quiz=quiz).count()
    total_attempted_questions=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    attempted_questions=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz)
    
    total_correct_questions=0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_questions +=1
    
    return JsonResponse({'total_questions':total_questions,'total_attempted_questions':total_attempted_questions,'total_correct_questions':total_correct_questions})

class StudyMaterialList(generics.ListCreateAPIView):
    queryset=models.StudyMaterial.objects.all()
    serializer_class=StudyMaterialSerializer
    
    def get_queryset(self):
        course_id=self.kwargs["course_id"]
        course=models.Course.objects.get(pk=course_id)
        return models.StudyMaterial.objects.filter(course=course)

class StudyMaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudyMaterial.objects.all()
    serializer_class=StudyMaterialSerializer

def update_view(request,course_id):
    queryset=models.Course.objects.filter(pk=course_id).first()
    queryset.course_views +=1
    queryset.save()
    
    return JsonResponse({'views':queryset.course_views})

class FaqList(generics.ListCreateAPIView):
    queryset=models.FaQ.objects.all()
    serializer_class=FaqSerializer
    
class FlatPageList(generics.ListAPIView):
    queryset=FlatPage.objects.all()
    serializer_class=FlatPagesSerializer
    
class FlatPageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=FlatPage.objects.all()
    serializer_class=FlatPagesSerializer
    
class ContactList(generics.ListCreateAPIView):
    queryset=Contact.objects.all()
    serializer_class=ContactSerializer
    
@csrf_exempt
def teacher_forgot_password(request):
    email=request.POST["email"]
    verify=models.Teacher.objects.filter(email=email).first()
    if verify:
        otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/teacher-forgot-password/{verify.id}/"
        send_mail(
            'Contact Query',
            'Please verify your count',
            'djibrilbarry1011@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{link}</p>'
        )
        models.Teacher.objects.filter(email=email).update(otp_digit=otp_digit)
        
        return JsonResponse ({'bool': True , 'teacher_id':verify.id , 'msg':"check email" })
    else:
        return JsonResponse({'bool': False , 'msg':"Invalid Email !!"})
    
    
@csrf_exempt
def student_forgot_password(request):
    email=request.POST["email"]
    verify=models.Student.objects.filter(email=email).first()
    if verify:
        otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/student-forgot-password/{verify.id}/"
        send_mail(
            'Contact Query',
            'Please verify your count',
            'djibrilbarry1011@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{link}</p>'
        )
        models.Student.objects.filter(email=email).update(otp_digit=otp_digit)
        
        return JsonResponse ({'bool': True , 'student_id':verify.id , 'msg':"check email" })
    else:
        return JsonResponse({'bool': False , 'msg':"Invalid Email !!"})
    
    
@csrf_exempt
def save_teacher_student_msg(request ,teacher_id, student_id):
    teacher=models.Teacher.objects.get(id=teacher_id)
    student=models.Student.objects.get(id=student_id)
    msg_text=request.POST['msg_text']
    msg_from=request.POST['msg_from']
    msgRes=models.TeacherStudentChat.objects.create(
        teacher=teacher,
        student=student,
        msg_text=msg_text,
        msg_from=msg_from,
    )
    
    if msgRes:
        return JsonResponse({'bool':True , 'msg':"Message has been send"})
    else:
        return JsonResponse({'bool':False})
    
class MessageList(generics.ListCreateAPIView):
    queryset=TeacherStudentChat
    serializer_class=TeacherStudentChatSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs["teacher_id"]
        student_id=self.kwargs["student_id"]
        teacher=models.Teacher.objects.get(pk=teacher_id)
        student=models.Student.objects.get(pk=student_id)
        return models.TeacherStudentChat.objects.filter(teacher=teacher,student=student)

@csrf_exempt
def save_teacher_student_group_msg(request ,teacher_id):
    teacher=models.Teacher.objects.get(id=teacher_id)
    enrolleds=models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()
    for enroll in enrolleds:
        msg_text=request.POST['msg_text']
        msg_from=request.POST['msg_from']
        msgRes=models.TeacherStudentChat.objects.create(
            teacher=teacher,
            student=enroll.student,
            msg_text=msg_text,
            msg_from=msg_from,
        )
    
    if msgRes:
        return JsonResponse({'bool':True , 'msg':"Message has been send"})
    else:
        return JsonResponse({'bool':False, "msg": "Oups message has not been send"})
    
class MyTeacherList(generics.ListAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs["student_id"]
            sql=f"""SELECT * FROM main_course as c , main_studentcourseenrollment as e, 
                    main_teacher as t WHERE c.teacher_id=t.id and e.course_id=c.id and
                    e.student_id={student_id} GROUP BY c.teacher_id
                """
            qs=models.Course.objects.raw(sql)
            return qs

@csrf_exempt
def save_teacher_student_group_msg_from_student(request ,student_id ):
    student=models.Student.objects.get(id=student_id)
    
    sql=f"""SELECT * FROM main_course as c , main_studentcourseenrollment as e, 
                    main_teacher as t WHERE c.teacher_id=t.id and e.course_id=c.id and
                    e.student_id={student_id} GROUP BY c.teacher_id
                """
    qs=models.Course.objects.raw(sql)
    myCourses=qs
    
    for course in myCourses:
        msg_text=request.POST['msg_text']
        msg_from=request.POST['msg_from']
        msgRes=models.TeacherStudentChat.objects.create(
            teacher=course.teacher,
            student=student,
            msg_text=msg_text,
            msg_from=msg_from,
        )
    
    if msgRes:
        return JsonResponse({'bool':True , 'msg':"Message has been send"})
    else:
        return JsonResponse({'bool':False})