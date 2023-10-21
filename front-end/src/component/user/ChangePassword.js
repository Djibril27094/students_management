import React, {useState , useEffect} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialData = {
    password:''
}

function ChangePassword() {

    const [studentData, setStudentData] = useState(initialData);
    const studentId=localStorage.getItem("studentId")

    useEffect (()=> {
        document.title= "Teacher logout"
    })

    const handleChange = e => {
        setStudentData({
            ...studentData,
            [e.target.name]:e.target.value
        })
    }

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("password", studentData.password)
      

        axios.post(baseUrl + '/student/change-password/'+ studentId , _formData)
        .then(res => {
            if (res.data.bool === true) {
                alert("password update success")
                window.location.href = "/user-logout"
            }
            
        }).catch(err => {
            alert("Oups... some error occured ")
        })
    }
    const studentLoginStatus = localStorage.getItem("studentLoginStatus")
  if (studentLoginStatus  !== 'true') {
    window.location.href = '/user-logout'
  }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className='col-md-8'>
                <div className="card">
                   <h3 className="card-header">Change Password</h3>
                   <div className="card-body">
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                                <input type="text" name="password" onChange={handleChange} value={studentData.password} className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <hr />
                        <button className="btn btn-primary" onClick={formSubmit}>Update</button>
                   </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default ChangePassword