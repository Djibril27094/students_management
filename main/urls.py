
from django.urls import path

from . import views


urlpatterns = [
    
    # Teacher
    path("teacher/" , views.TeacherList.as_view()),
    path("teacher/<int:pk>" , views.TeacherDetail.as_view()),
    path("teacher/dashboard/<int:pk>",views.TeacherDashboard.as_view()),
    path("teacher-login" , views.teacher_login),
    path("verify-teacher/<int:teacher_id>" , views.verify_teacher_via_otp),
    path("teacher-forgot-password/" , views.teacher_forgot_password),
    path("teacher-change-forgot-password/<int:teacher_id>/" , views.teacher_change_password),
    path("teacher/change-password/<int:teacher_id>" , views.teacher_change_password),
    path("popular-teachers/" , views.PopularTeacherList.as_view()),
    
    # Category
    path("category/" , views.CategoryList.as_view()),
    # Course
    path("course/", views.CourseList.as_view()),
    path("popular-courses/", views.CourseRatingList.as_view()),
    path("search-course/<str:searchstring>", views.CourseList.as_view()),
    path("course/<int:pk>", views.CourseDetailView.as_view()),
    path("update-view/<int:course_id>", views.update_view),
    # chapter
    path("chapter/<int:course_id>", views.ChapterList.as_view()),
    path("course-chapters/<int:course_id>",views.CourseChapterList.as_view()),
    # specific chapter
    path("chapter/<int:pk>", views.ChapterDetailView.as_view()),
    # Teacher coures
    path("teacher-course/<int:teacher_id>" , views.TeacherCourseList.as_view()),
    # Teacher specific coursee
    path("teacher-course-detail/<int:pk>", views.TeacherCourseDetail.as_view()),
    # Student Testimonial 
    path("student-testimonial/", views.CourseRatingList.as_view()),
    # Student
    path("student/",views.StudentList.as_view()),
    path("student/dashboard/<int:pk>",views.StudentDashboard.as_view()),
    path("student/<int:pk>",views.StudentDetail.as_view()),
    path("student-login" , views.student_login),
    path("student-forgot-password/" , views.student_forgot_password),
    path("student/change-password/<int:student_id>" , views.student_change_password),
    path("student-forgot-password/<int:student_id>/" , views.student_change_password),
    path("student-enroll-course/", views.StudentEnrollCourseList.as_view()),
    path("fetch-enroll-status/<int:student_id>/<int:course_id>", views.fetch_enroll_status),
    path("verify-student/<int:student_id>" , views.verify_student_via_otp),
    
    path("fetch-enrolled-student/<int:course_id>" , views.EnrolledStudentList.as_view()),
    path("fetch-enrolled-courses/<int:student_id>" , views.EnrolledStudentList.as_view()),
    path("fetch-recommended-courses/<int:studentId>" , views.CourseList.as_view()),
    path("fetch-all-enrolled-student/<int:teacher_id>" , views.EnrolledStudentList.as_view()),
    path("student-add-favorite-course/" , views.StudentFavoriteCourseList.as_view()),
    path("student-remove-favorite-course/<int:student_id>/<int:course_id>" , views.remove_favorite_course),
    path("fetch-favorite-status/<int:student_id>/<int:course_id>" , views.fetch_favorite_status),
    path("fetch-favorite-courses/<int:student_id>" , views.StudentFavoriteCourseList.as_view()),
    path("course-rating/<int:course_id>" , views.CourseRatingList.as_view()),
    path("fetch-rating-status/<int:student_id>/<int:course_id>", views.fetch_enroll_status),
    path("student-assignment/<int:teacher_id>/<int:student_id>", views.AssignmentList.as_view()),
    path("my-assignments/<int:student_id>", views.MyAssignmentList.as_view()),
    path("update-assignments/<int:pk>", views.UpdateAssignment.as_view()),
    path("student/fetch-all-notifications/<int:student_id>", views.NotificationList.as_view()),
    path("save-notification", views.NotificationList.as_view()),
    # Quiz Start
    path("quiz/", views.QuizList.as_view()),
    path("teacher-quiz/<int:teacher_id>", views.QuizList.as_view()),
    path("teacher-quiz-detail/<int:pk>", views.TeacherQuizDetail.as_view()),
    path("quiz-questions/<int:quiz_id>", views.QuizQuestionList.as_view()),
    path("quiz-questions/<int:quiz_id>/<int:limit>", views.QuizQuestionList.as_view()),
    path("question/<int:pk>", views.QuestionDetailView.as_view()),
    path("fetch-quiz-assign-status/<int:quiz_id>/<int:course_id>", views.fetch_quiz_assign_status),
    path("quiz-assign-course/", views.CourseQuizList.as_view()),
    path("fetch-assigned-quiz/<int:course_id>", views.CourseQuizList.as_view()),
    path("attempt-quiz/", views.AttemptQuizList.as_view()),
    path("quiz-questions/<int:quiz_id>/next-question/<int:question_id>", views.QuizQuestionList.as_view()),
    path("fetch-quiz-attempt-status/<int:quiz_id>/<int:student_id>", views.fetch_quiz_attempt_status),
    # Study material
    path("study-materials/<int:course_id>", views.StudyMaterialList.as_view()),
    path("user/study-materials/<int:course_id>", views.StudyMaterialList.as_view()),
    # Specifi study material
    path("study-material/<int:pk>", views.StudyMaterialDetail.as_view()),
    path("attempted-quiz/<int:quiz_id>", views.AttemptQuizList.as_view()),
    path("fetch-quiz-result/<int:quiz_id>/<int:student_id>", views.fetch_quiz_result),
    path("faq/" , views.FaqList.as_view()),
    path("pages/" , views.FlatPageList.as_view()),
    path("pages/<int:pk>/<str:page_slug>/" , views.FlatPageDetail.as_view()),
    path("contact/" , views.ContactList.as_view()),
    # Message
    path("send-message/<int:teacher_id>/<int:student_id>", views.save_teacher_student_msg),
    path("get-message/<int:teacher_id>/<int:student_id>", views.MessageList.as_view()),
    path("fetch-my-teachers/<int:student_id>", views.MyTeacherList.as_view()),
    path("send-group-message/<int:teacher_id>", views.save_teacher_student_group_msg),
    path("send-group-message-from-student/<int:student_id>", views.save_teacher_student_group_msg_from_student),
]
