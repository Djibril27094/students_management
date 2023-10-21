import React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  email:'',
}

function TeacherForgotPassword() {
  const [teacherData, seTteacherData] = useState(initialLoginData)
  const [test, setTest] = useState(false)
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = "Teacher Forgot Password"
  })
  
  const handleChange = (e)=> {
    seTteacherData({
      ...teacherData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = (e) => {
    const teacherFormData = new FormData()
    teacherFormData.append('email', teacherData.email)
    
      axios.post(baseUrl + '/teacher-forgot-password/',teacherFormData).then( (res) => {
        if (res.data.bool === true) {
          setSuccessMsg(res.data.msg)
          setErrorMsg(res.data.msg)
          setTest(false)
        }else {
            setErrorMsg(res.data.msg)
            setTest(true)
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
            <h3 className="card-header">Enter your registered Email</h3>
            <div className="card-body">
              {/*<form>*/}
                { test &&
                  <div className="mb-3 alert alert-danger">
                    {errorMsg}
                  </div>
                }
                { test === false &&
                    <p className="mb-3 text-success">
                      {successMsg}
                    </p>
                  }
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                  <input type="text" name='email' onChange={handleChange} value={teacherData.email} className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
                </div>
                
                <button type="submit" onClick={submitForm} className="btn btn-primary">Send</button>
                {/*</form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherForgotPassword