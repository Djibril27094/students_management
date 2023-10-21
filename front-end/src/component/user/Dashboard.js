import React , {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([])
  const studentId = localStorage.getItem("studentId")

  useEffect(()=> {
    try {
      axios.get(baseUrl + "/student/dashboard/" + studentId)
      .then(res => {
        console.log(res.data);
        setDashboardData(res.data)
      })
    }catch(err){
      console.log(err);
    }
  },[studentId])
  return (
    <div className="container">
        <div className="row">
            <aside className="col-md-3 d-md-block px-sm-2 px-0 mx-0">
                <Sidebar /> 
            </aside>
            <section className='col-md-9 mt-5'>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h5 className="card-header bg-primary text-white text-center">Enrolled Courses</h5>
                      <div className="card-body">
                        <h3 className='text-center'><Link to="/my-courses">{dashboardData.enrolled_courses}</Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-success">
                      <h5 className="card-header bg-success text-white text-center">Favorite Courses</h5>
                      <div className="card-body">
                        <h3 className='text-center'><Link to="/favorite-courses" className='text-success'>{dashboardData.favorite_courses}</Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-primary">
                      <h5 className="card-header bg-primary text-white text-center">Assignments</h5>
                      <div className="card-body">
                        <h5>Completed:<Link to={`/assignments/${studentId}`}>{dashboardData.complete_assignment}</Link> Pending: <Link to={`/assignments/${studentId}`}>{dashboardData.pending_assignment}</Link></h5>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Dashboard