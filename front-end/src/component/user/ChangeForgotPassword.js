import React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams  } from 'react-router-dom'
const baseUrl = "http://localhost:8000/api"

const initialLoginData = {
  password: '',
}

function ChangeForgotPassword() {
  const [teacherData, seTteacherData] = useState(initialLoginData)
  const [test, setTest] = useState(false)
  const [errorMsg, setErrorMsg] = useState();
  const {student_id} = useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = "Student Change Password"
  })
  
  const handleChange = (e)=> {
    seTteacherData({
      ...teacherData,
      [e.target.name]:e.target.value
    })
  }

  const submitForm = (e) => {
    const studentFormData = new FormData()
    studentFormData.append('password', teacherData.password)
    
      axios.post(baseUrl + '/student-forgot-password/'+student_id+'/' ,studentFormData).then( (res) => {
        if (res.data.bool === true) {
          navigate("/user-login")
        }else {
            setErrorMsg(res.data.msg)
            setTest(true)
        }
      }).catch(err =>{
        setTest(true)
      })
  }

  
  return (
    
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-sm-12 col-md-6 offset-md-3">
          <div className="card">
            <h3 className="card-header">Enter your new Password</h3>
            <div className="card-body">
              {/*<form>*/}
                { test &&
                  <div className="mb-3 alert alert-danger">
                    {errorMsg}
                  </div>
                }

                <div className="mb-3">
                  <label htmlFor="exampleInputpassword" className="form-label">Password</label>
                  <input type="text" name='password' onChange={handleChange} value={teacherData.password} className="form-control" id="exampleInputpassword" aria-describedby="passwordHelp" />
                </div>
                
                <button type="submit" onClick={submitForm} className="btn btn-primary">Change</button>
                {/*</form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeForgotPassword