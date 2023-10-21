import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"
function Sidebar() {

  const [notifData, setNotifData] = useState([]);

  const student_id = localStorage.getItem("studentId")
  useEffect(() => {
    axios.get(baseUrl + '/student/fetch-all-notifications/' + student_id)
    .then(res => {
      setNotifData(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [student_id]);

  return (
    <div className="card">
        <h3 className="card-header">Dashboard</h3>
        <div className="card-body">
            <div className="list-group">
                <Link to="/user-dashboard" className='list-group-item list-group-item-action'>Dashboard</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">My Courses</Link>
                <Link to="/my-teachers" className="list-group-item list-group-item-action">My teachers</Link>
                <Link to="/favorite-courses" className="list-group-item list-group-item-action">Favorite Courses</Link>
                <Link to="/recommend-courses" className="list-group-item list-group-item-action">Recomended Courses</Link>
                <Link to={`/assignments/${student_id}`} className="list-group-item list-group-item-action">Assignments<span className='float-end badge bg-danger'>
                {notifData.length}</span> </Link>
                <Link to="/profile-setting" className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar