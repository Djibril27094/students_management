import React , { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/api/teacher/"

const initialData = {
  'full_name':'',
  'email':"",
  'password':'',
  'qualification':'',
  'mobile_no':'',
  'Skills': '',
  'status': '',
  'otp_digit': '',
}

function TeacherRegister() {
  
  const [teacherData, setTeacherData] = useState(initialData)
  const [errorData, setErrorData] = useState(initialData)
  const navigate=useNavigate()

  useEffect(() => {
    document.title = "Teacher Register"
  })

  const handleChange = (e) => {
    // Levels error
    if (e.target.name === 'full_name' && e.target.value.length < 5) {
        // console.log("Le nom doit être supérieur a 4 caractere");
      setErrorData({
        ...errorData,
        "full_name": "Nom d'utilisateur doit être superieu a 4"
      })
    }else if (e.target.name === 'full_name' && e.target.value.length >= 5)  {
      setErrorData({
        ...errorData,
        "full_name": ""
      })
    }
    if (e.target.name === 'email' && e.target.value.length < 4) {
        setErrorData({
          ...errorData,
          "email": "Adresse email invalid"
        })
    }else if (e.target.name === 'email' && e.target.value.length >= 4) {
      setErrorData({
        ...errorData,
        "email": ""
      })
    }

    if (e.target.name === 'password' && e.target.value.length < 5) {
      setErrorData({
        ...errorData,
        "password": "Le mot de passe doit être minimun de 5 caractère"
      })
    }else if (e.target.name === 'password' && e.target.value.length >= 5) {
      setErrorData({
        ...errorData,
        "password": ""
      })
    }
    
    // end error
    //teacher
    setTeacherData({
      ...teacherData,
      [e.target.name]:e.target.value
    })
    //end teacher
  }

  const handleSubmit = () => {
    const otp_digit=Math.floor(100000 + Math.random() * 900000)
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email)
    teacherFormData.append("password", teacherData.password)
    teacherFormData.append("qualification", teacherData.qualification)
    teacherFormData.append("mobile_no", teacherData.mobile_no)
    teacherFormData.append("Skills", teacherData.Skills)
    teacherFormData.append("otp_digit", otp_digit)

    try {
      axios.post(baseUrl , teacherFormData).then((res) => {
        setTeacherData(initialData)
        setErrorData(initialData)
        navigate('/verify-teacher/' + res.data.id)
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
            <h3 className="card-header">Teacher Register</h3>
            <div className="card-body">
              {/*<form> */}
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">FullName</label>
                  <input onChange={handleChange} value={teacherData.full_name} name="full_name" type="text" className="form-control" id="exampleInputFullName" aria-describedby="UsernameHelp" />
                  <div id="textHelp" name='Skills' className="form-text"><span className='text-danger'>{errorData.full_name}</span></div>  
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                  <input onChange={handleChange} value={teacherData.email} name="email" type="email" className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
                  <div id="textHelp" name='Skills' className="form-text"><span className='text-danger'>{errorData.email}</span></div>  
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputQualification" className="form-label">Qualification</label>
                  <input onChange={handleChange} value={teacherData.qualification} type="text" name="qualification" className="form-control" id="exampleInputQualification" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                  <div id="textHelp" name='Skills' value={teacherData.password} className="form-text"><span className='text-danger'>{errorData.password}</span></div>  
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputMobile" className="form-label">Mobile Number</label>
                  <input type="number" name="mobile_no" value={teacherData.mobile_no} onChange={handleChange} className="form-control" id="exampleInputMobile" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputInterested" className="form-label">Skills</label>
                  <textarea onChange={handleChange} value={teacherData.Skills} name='Skills' id="exampleInputInterested" className='form-control'></textarea>
                  <div id="textHelp" name='Skills' className="form-text">ReactJS et Python.</div>
                </div>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Register</button>
              {/*</form>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherRegister