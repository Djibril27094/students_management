import React , { useEffect , useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://127.0.0.1:8000/api/student/"
const initialData = {
  'full_name':'',
  'email':'',
  'password':'',
  'username':'',
  'interest':'',
  'status': '',
}


function Register() {

  const [studentData, setStudentData] = useState(initialData)
  const navigate=useNavigate()
  // const [errorData, setErrorData] = useState(initialData)

  useEffect(() => {
    document.title="Student Register"
  }, []);
  const handleChange=(e)=> {
    setStudentData({
      ...studentData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = () => {
    const otp_digit=Math.floor(100000 + Math.random() * 900000)
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name)
    studentFormData.append("email", studentData.email)
    studentFormData.append("password", studentData.password)
    studentFormData.append("username", studentData.username)
    studentFormData.append("interested_categories", studentData.interest)
    studentFormData.append("otp_digit", otp_digit)

    try {
      axios.post(baseUrl , studentFormData).then((res) => {
        setStudentData(initialData)
        navigate('/verify-student/' + res.data.id)
      })
    }catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-sm-12 col-md-6 offset-md-3">
          <div className="card">
            <h3 className="card-header">User Register</h3>
            <div className="card-body">
              {/*<form>*/}
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">FullName</label>
                  <input type="text" value={studentData.full_name} name='full_name' onChange={handleChange} className="form-control" id="exampleInputFullName" aria-describedby="UsernameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                  <input type="email" name='email' value={studentData.email} onChange={handleChange} className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                  <input type="text" name='username' value={studentData.username} onChange={handleChange} className="form-control" id="exampleInputUsername" aria-describedby="UsernameHelp" />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' value={studentData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputInterested" className="form-label">Interested</label>
                  <textarea id="exampleInputInterested" name='interest' value={studentData.interest} onChange={handleChange} className='form-control'></textarea>
                  <div id="textHelp" className="form-text">ReactJS et Python.</div>
                </div>
                
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Register</button>            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register