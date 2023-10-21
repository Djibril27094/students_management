import React from 'react'
import {Link} from 'react-router-dom'

function TeacherSidebar() {
  return (
    <div className="card">
        <h3 className="card-header">Dashboard</h3>
        <div className="card-body">
            <div className="list-group">
                <Link to="/teacher/dashboard" className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to="/teacher/courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/teacher/addCourses" className="list-group-item list-group-item-action">Add Courses</Link>
                <Link to="/teacher/userList" className="list-group-item list-group-item-action">My users</Link>
                <Link to="/teacher/quiz" className="list-group-item list-group-item-action">Quiz</Link>
                <Link to="/teacher/add-quiz" className="list-group-item list-group-item-action">Add Quiz</Link>
                <Link to="/teacher/profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/teacher/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/teacher/logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    </div>
  )
}

export default TeacherSidebar