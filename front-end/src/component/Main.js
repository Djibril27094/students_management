
import React from 'react'
import { Route, Routes } from 'react-router-dom'

//Fichier config

import Footer from './config/Footer'
import Header from './config/Header'

// Others

import CourseDeatails from './CourseDeatails'
import About from './About'
import Home from './Home'

// User

import Dashboard from './user/Dashboard'
import Login from './user/Login'
import MyCourses from './user/MyCourses'
import Register from './user/Register'
import FavoriteCourses from './user/FavoriteCourses'
import RecommendCourses from './user/RecommendCourses'
import ProfileSetting from './user/ProfileSetting'
import ChangePassword from './user/ChangePassword'
import StudentAssignment from './user/StudentAssignment'

// Teacher 

import TeacherDashboard from './teacher/TeacherDashboard'
import TeacherMyCourses from './teacher/TeacherCourses'
import AddCourses from './teacher/AddCourses'
import UserList from './teacher/UserList'
import TeacherProfileSetting from './teacher/TeacherProfileSetting'
import TeacherChangePassword from './teacher/TeacherChangePassword'
import TeacherLogin from './teacher/TeacherLogin'
import TeacherRegister from './teacher/TeacherRegister'
import TeacherDetail from './teacher/TeacherDetail'
import AllCourse from './AllCourse'
import PopularCourses from './PopularCourses'
import PopularTeachers from './teacher/PopularTeachers'
import CategoryCourses from './CategoryCourses'
import TeacherLogout from './teacher/TeacherLogout'
import AddChapter from './teacher/AddChapter'
import CourseChapters from './teacher/CourseChapters'
import EditChapter from './teacher/EditChapter'
import EditCourse from './teacher/EditCourse'
import TeacherSkillCourse from './teacher/TeacherSkillCourse'
import Logout from './user/Logout'
import EnrolledStudent from './teacher/EnrolledStudent'
import AddAssignment from './teacher/AddAssignment'
import ShowAssignment from './teacher/ShowAssignment'
import AddQuiz from './teacher/AddQuiz'
import AllQuiz from './teacher/AllQuiz'
import EditQuiz from './teacher/EditQuiz'
import AddQuizQuestion from './teacher/AddQuizQuestion'
import QuizQuestions from './teacher/QuizQuestions'
import EditQuizQuestion from './teacher/EditQuizQuestion'
import AssignQuiz from './teacher/AssignQuiz'
import CourseQuizList from './user/CourseQuizList'
import TakeQuiz from './user/TakeQuiz'
import Search from './Search'
import StudyMaterials from './teacher/StudyMaterials'
import AddStudyMaterial from './teacher/AddStudyMaterial'
import EditStudyMaterial from './teacher/EditStudyMaterial'
import UserStudyMaterials from './user/UserStudyMaterials'
import AttemptedStudent from './teacher/AttemptedStudent'
import Category from './Category'
import FaQ from './FaQ'
import Page from './Page'
import ContactUs from './ContactUs'
import VerifyTeacher from './teacher/VerifyTeacher'
import VerifyStudent from './user/VerifyStudent'
import TeacherForgotPassword from './teacher/TeacherForgotPassword'
import TeacherChangeForgotPassword from './teacher/TeacherChangeForgotPassword'
import ForgotPassword from './user/ForgotPassword'
import ChangeForgotPassword from './user/ChangeForgotPassword'
import MyTeachers from './user/MyTeachers'


const Main = () => {
  return (
    <div>
        <Header />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/detail/:course_id" element={<CourseDeatails/>} />
          <Route path="/user-register" element={<Register />} />  
          <Route path="/user-login" element={<Login />} />
          <Route path="/teacher-forgot-password" element={<TeacherForgotPassword />} />
          <Route path="/user-logout" element={<Logout />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/course-quiz/:course_id" element={<CourseQuizList />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/favorite-courses" element={<FavoriteCourses />} />
          <Route path="/recommend-courses" element={<RecommendCourses />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/teacher/dashboard' element={<TeacherDashboard /> }/>     
          <Route path='/teacher/courses' element={<TeacherMyCourses /> }/>
          <Route path='/teacher/addCourses' element={<AddCourses /> }/>
          <Route path='/teacher/userList' element={<UserList /> }/>
          <Route path='/teacher/profile-setting' element={<TeacherProfileSetting /> }/>
          <Route path='/teacher/change-password' element={<TeacherChangePassword /> }/>
          <Route path='/teacher-forgot-password/:teacher_id' element={<TeacherChangeForgotPassword /> }/>
          <Route path='/teacher/login' element={<TeacherLogin /> }/>
          <Route path='/teacher/register' element={<TeacherRegister /> }/>
          <Route path='/teacher/logout' element={<TeacherLogout /> }/>
          <Route path='/teacher/add-quiz' element={<AddQuiz /> }/>
          <Route path='/teacher/quiz' element={<AllQuiz /> }/>
          <Route path="/teacher/edit-quiz/:quiz_id" element={<EditQuiz />}/>
          <Route path="/teacher/add-quiz-question/:quiz_id" element={<AddQuizQuestion />}/>
          <Route path="/all-questions/:quiz_id" element={<QuizQuestions />}/>
          <Route path="/takes-quiz/:quiz_id" element={<TakeQuiz />}/>
          <Route path='/teacher/addChapter/:course_id' element={<AddChapter /> }/>
          <Route path="/edit-question/:question_id" element={<EditQuizQuestion />}/>
          <Route path="/assign-course/:course_id" element={<AssignQuiz />}/>
          <Route path='/add-assignment/:student_id/:teacher_id' element={<AddAssignment />}/>
          <Route path='/show-assignment/:student_id/:teacher_id' element={<ShowAssignment />}/>
          <Route path='/assignments/:student_id' element={<StudentAssignment />}/>
          <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />}/>
          <Route path="/category" element={<Category />}/>  
          <Route path="/category/:category_id/:category_slug" element={<CategoryCourses />}/>
          <Route path="/all-courses" element={<AllCourse />}/>  
          <Route path="/search/:searchstring" element={<Search />}/>
          <Route path="/all-chapters/:course_id" element={<CourseChapters />}/>
          <Route path="/edit-chapter/:chapter_id" element={<EditChapter />}/>
          <Route path="/teacher/edit-course/:course_id" element={<EditCourse />}/>
          <Route path="/popular-courses" element={<PopularCourses />}/>
          <Route path="/popular-teachers" element={<PopularTeachers />}/>
          <Route path="/teacher-skill-couses/:skill_name/:teacher_id" element={<TeacherSkillCourse />}/>
          <Route path='/enrolled-student/:course_id' element={<EnrolledStudent/>} />
          
          <Route path="/materials-study/:course_id" element={<StudyMaterials />}/>  
          <Route path="/user/materials-study/:course_id" element={<UserStudyMaterials />}/>  
          <Route path="/add-study/:course_id" element={<AddStudyMaterial />}/>  
          <Route path="/edit-study/:study_id" element={<EditStudyMaterial />}/>  
          <Route path="/attempted-students/:quiz_id" element={<AttemptedStudent />}/>  
          <Route path="/faq" element={<FaQ />}/>  
          <Route path="/page/:page_id/:title_slug" element={<Page />}/>  
          <Route path="/contact-us" element={<ContactUs />}/>  
          <Route path="/verify-teacher/:teacher_id" element={<VerifyTeacher />}/>  
          <Route path="/verify-student/:student_id" element={<VerifyStudent />}/>  
          <Route path="/user-forgot-password" element={<ForgotPassword />}/>  
          <Route path="/student-forgot-password/:student_id" element={<ChangeForgotPassword />}/>  
          <Route path="/my-teachers" element={<MyTeachers />}/>  
          

        </Routes>
        <Footer />
    </div>
  )
}

export default Main