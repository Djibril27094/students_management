import React ,{useEffect , useState} from 'react'
import {useParams , useNavigate} from "react-router-dom"
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  otp_digit:'',
}

function VerifyStudent() {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState(initialLoginData)
  const [test, setTest] = useState(false)

  const {student_id} = useParams()
  useEffect(()=>{
    document.title = "Verify otp_digit"
  })
  
  const handleChange = (e)=> {
    setStudentData({
      ...studentData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = (e) => {
    const studentFormData = new FormData()
    studentFormData.append('otp_digit', studentData.otp_digit)
    
      axios.post(baseUrl + '/verify-student/' + student_id,studentFormData).then( (res) => {
        if (res.data.bool === true) {
          localStorage.setItem("studentLoginStatus", true)
          localStorage.setItem("studentId", res.data.student_id)
          navigate('/user-dashboard')
        }else {
          setTest(true)
        }
      }).catch(err =>{
        setTest(true)
        
      })
  }

  const studentLoginStatus = localStorage.getItem("studentLoginStatus")
  if (studentLoginStatus  === 'true') {
    window.location.href = '/user-dashboard'
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
                    Digit otp incorrect
                  </p>
                }
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">otp_digit</label>
                  <input type="number" name='otp_digit' onChange={handleChange} value={studentData.otp_digit} className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
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

export default VerifyStudent