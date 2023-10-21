import React ,{useEffect , useState} from 'react'
import {useParams , useNavigate} from "react-router-dom"
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  otp_digit:'',
}

function VerifyTeacher() {
  const navigate = useNavigate()
  const [teacherData, setTeacherData] = useState(initialLoginData)
  const [test, setTest] = useState(false)
  const [errorMsg, setErrorMsg] = useState();

  const {teacher_id} = useParams()
  useEffect(()=>{
    document.title = "Verify otp_digit"
  })
  
  const handleChange = (e)=> {
    setTeacherData({
      ...teacherData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = (e) => {
    const teacherFormData = new FormData()
    teacherFormData.append('otp_digit', teacherData.otp_digit)
    
      axios.post(baseUrl + '/verify-teacher/' + teacher_id,teacherFormData).then( (res) => {
        if (res.data.bool === true) {
          localStorage.setItem("teacherLoginStatus", true)
          localStorage.setItem("teacherId", res.data.teacher_id)
          navigate('/teacher/dashboard')
        //   window.location.href = '/teacher/dashboard'
        }else {
          setTest(true)
          setErrorMsg(res.data.msg)
        }
      }).catch(err =>{
        setTest(true)
        
      })
  }

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  if (teacherLoginStatus  === 'true') {
    window.location.href = '/teacher/dashboard'
  }
  return (
    
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-sm-12 col-md-6 offset-md-3">
          <div className="card">
            <h3 className="card-header">Enter 6 Digit otp_digit</h3>
            <div className="card-body">
              {/*<form>*/}
                { test &&
                  <p className="mb-3 alert alert-danger">
                    {errorMsg}
                  </p>
                }
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">OTP</label>
                  <input type="number" name='otp_digit' onChange={handleChange} value={teacherData.otp_digit} className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
                </div>
    
                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                {/*</form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyTeacher