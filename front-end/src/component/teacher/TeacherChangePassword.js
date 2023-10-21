import React, {useState , useEffect} from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialData = {
    password:''
}

function TeacherChangePassword() {

    const [teacherData, setTeacherData] = useState(initialData);
    const teacherId=localStorage.getItem("teacherId")

    useEffect (()=> {
        document.title= "Teacher logout"
    })

    const handleChange = e => {
        setTeacherData({
            ...teacherData,
            [e.target.name]:e.target.value
        })
    }

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("password", teacherData.password)
      

        axios.post(baseUrl + '/teacher/change-password/'+ teacherId , _formData)
        .then(res => {
            if (res.data.bool === true) {
                alert("password update success")
                window.location.href = "/teacher/logout"
            }
            
        }).catch(err => {
            alert("Oups... some error occured ")
        })
    }
    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  if (teacherLoginStatus  !== 'true') {
    window.location.href = '/teacher/logout'
  }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className='col-md-9'>
                <div className="card">
                   <h3 className="card-header">Change Password</h3>
                   <div className="card-body">
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                                <input type="text" name="password" onChange={handleChange} value={teacherData.password} className="form-control" id="inputPassword" />
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

export default TeacherChangePassword