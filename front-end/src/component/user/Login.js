import React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'
const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  email:'',
  password: '',
}

function Login() {

  const [studentLoginData, setStudentLoginData] = useState(initialLoginData)
  const [test, setTest] = useState(false)
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    document.title = "Student Login"
  })
  
  const handleChange = (e)=> {
    setStudentLoginData({
      ...studentLoginData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = e => {
    const studentFormData = new FormData()
    studentFormData.append('email', studentLoginData.email) 
    studentFormData.append('password', studentLoginData.password)
    
    axios.post(baseUrl + '/student-login',studentFormData)
    .then (res => {
      console.log(res.data);
      if (res.data.bool === true) {
        if (res.data.login_via_otp === true) {
          navigate('/verify-student/' +res.data.student_id)
        }else {
          localStorage.setItem("studentLoginStatus",true)
          localStorage.setItem("studentId",res.data.student_id)
          navigate('/user-dashboard')
        }
      }else {
        setTest(true)
        setErrorMsg(res.data.msg)
      }
    }).catch(err =>{
      console.log(err);
    })
  
  }
  const studentLoginStatus = localStorage.getItem("studentLoginStatus")
  if (studentLoginStatus  === 'true') {
    navigate('/user-dashboard')
  }
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-sm-12 col-md-6 offset-md-3">
          <div className="card">
            <h3 className="card-header">User Login</h3>
            <div className="card-body">
              {/*<form>*/}
                { test &&
                  <div className="mb-3 alert alert-danger">
                    {errorMsg}
                  </div>
                }
                <div className="mb-3">
                  <label htmlFor="exampleInputUsername" className="form-label">Email</label>
                  <input type="text" className="form-control" name='email' value={studentLoginData.email} onChange={handleChange} id="exampleInputUsername" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' className="form-control" onChange={handleChange} value={studentLoginData.password} id="exampleInputPassword1" />
                </div>
                <button  onClick={submitForm} className="btn btn-primary">Login</button>
                <p className='mt-3'><Link to="/user-forgot-password" className="text-danger">Forgot Password</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login