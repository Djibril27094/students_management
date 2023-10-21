import React , {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
    localStorage.removeItem('studentLoginStatus')
    localStorage.removeItem("studentId")
    useEffect(() => {
      setTimeout(()=> {
        navigate('/user-login')
      }, 3000)
    });
    
  return (
    <div style={{height:"50vh"}} className="d-flex justify-content-center align-items-center ">
      <div  className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Logout