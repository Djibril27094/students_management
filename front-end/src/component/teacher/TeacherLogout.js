import React  , { useEffect}from 'react'
import {useNavigate} from 'react-router-dom'

function TeacherLogout() {
    const navigate = useNavigate()
    localStorage.removeItem('teacherLoginStatus')
    localStorage.removeItem("teacherId")
    useEffect(() => {
      setTimeout(()=> {
        navigate('/teacher/login')
      }, 2000)
    }, []);
    
    
  return (
    <div style={{height:"50vh"}} className="d-flex justify-content-center align-items-center ">
      <div  className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    
  )
}

export default TeacherLogout