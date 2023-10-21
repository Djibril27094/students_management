import React , {useState,useEffect} from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"
const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState([])
  const teacherId = localStorage.getItem("teacherId")
  useEffect(()=> {
    try {
      axios.get(baseUrl + "/teacher/dashboard/" + teacherId)
      .then(res => {
        setDashboardData(res.data)
      })
    }catch(err){
      console.log(err);
    }
  },[teacherId])
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className='col-md-9'>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h5 className="card-header bg-primary text-white text-center">Total Courses</h5>
                      <div className="card-body">
                        <h3 className='text-center'><Link to="/teacher/courses">{dashboardData.total_teacher_courses}</Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-success">
                      <h5 className="card-header bg-success text-white text-center">Total Students</h5>
                      <div className="card-body">
                        <h3 className='text-center'><Link to="/teacher/userList" className='text-success'>{dashboardData.tatal_teacher_students}</Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-info">
                      <h5 className="card-header bg-info text-white text-center">Total Chapters</h5>
                      <div className="card-body">
                        <h3 className='text-center'><Link to="/teacher/courses">{dashboardData.total_teacher_chapters}</Link></h3>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default TeacherDashboard