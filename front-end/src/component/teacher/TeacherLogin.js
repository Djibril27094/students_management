import React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'
const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  email:'',
  password: '',
}

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState(initialLoginData)
  const [test, setTest] = useState(false)
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = "Teacher Login"
  })
  
  const handleChange = (e)=> {
    setTeacherLoginData({
      ...teacherLoginData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = (e) => {
    const teacherFormData = new FormData()
    teacherFormData.append('email', teacherLoginData.email)
    teacherFormData.append("password", teacherLoginData.password)
    
      axios.post(baseUrl + '/teacher-login',teacherFormData).then( (res) => {
        if (res.data.bool === true) {
          if (res.data.login_via_otp === true) {
            navigate('/verify-teacher/' +res.data.teacher_id)
          }else {
            localStorage.setItem("teacherLoginStatus",true)
            localStorage.setItem("teacherId", res.data.teacher_id)
            navigate('/teacher/dashboard')
          }
          
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
    navigate('/teacher/dashboard')
  }
  return (
    
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-sm-12 col-md-6 offset-md-3">
          <div className="card">
            <h3 className="card-header">Teacher Login</h3>
            <div className="card-body">
              {/*<form>*/}
                { test &&
                  <div className="mb-3 alert alert-danger">
                    {errorMsg}
                  </div>
                }
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                  <input type="text" name='email' onChange={handleChange} value={teacherLoginData.email} className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' onChange={handleChange} value={teacherLoginData.password} className="form-control" id="exampleInputPassword1" />
                </div>
                {/*<div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Remenber</label>
                  </div>*/}
                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                <p className='mt-3'><Link to="/teacher-forgot-password" className="text-danger">Forgot Password</Link></p>
                {/*</form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherLogin