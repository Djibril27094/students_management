import React, {useState , useEffect} from 'react'
import {Link , useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"
function EnrolledStudent() {

    const { course_id } = useParams()
    const [studentData, setStudentData] = useState([])
    useEffect(() => {
        axios.get(baseUrl + "/fetch-enrolled-student/" + course_id).then(res => {
            setStudentData(res.data)
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        }) 
    },[course_id])
    
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">Enrolled Student List</h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Interested categories</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((row , index) =>{
                                    return(
                                        <tr key={index}>
                                            <td><Link to={`/view-student/${row.student.id}`}>{row.student.full_name}</Link></td>
                                            <td>{row.student.email}</td>
                                            <td>{row.student.username}</td>
                                            <td>{row.student.interested_categories}</td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default  EnrolledStudent