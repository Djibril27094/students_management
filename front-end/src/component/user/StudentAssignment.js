import React,{useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

function StudentAssignment() {
    const [assignmentData, setAssignmentData] = useState([])
    const student_id = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(baseUrl + "/my-assignments/" + student_id)
        .then(res => {
            setAssignmentData(res.data) 
        

        }).catch(err => {
            console.log(err);
        })
    }, [student_id]);

    const markAsDone = (assignment_id , title , detail , student, teacher)=> {
    
        const _formData = new FormData()
        _formData.append("title", title)
        _formData.append("detail",detail)
        _formData.append("student",student)
        _formData.append("teacher", teacher)
        _formData.append("student_status", true)
    
        try {
          axios.put(baseUrl + '/update-assignments/' + assignment_id, _formData , {
            headers:{
              'content-type':"multipart/form-data"
            }
          }).then(res => {
    
              if (res.status === 200 || res.status === 201) {
                window.location.reload()
              } 
          })
        }catch(error) {
          console.log(error);
        }
      }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className="col-md-8">
                <div className="card">
                    <h3 className="card-header">My Assignments</h3>
                    <div className="card-body">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Detail</th>
                                    <th>Teacher</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    assignmentData.map((row , index) =>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>{row.detail}</td>
                                        <td><Link to={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name} </Link></td>
                                        <td>
                                            {
                                                row.student_status === false &&
                                                <button className='btn btn-success' onClick={()=>markAsDone(row.id,row.title,row.detail,row.student.id,row.teacher.id)}>Mark as Done</button>
                                            }
                                            {
                                                row.student_status === true &&
                                                <span className='badge bg-primary'>Completed</span>
                                            }
                                        </td>    
                                    </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default StudentAssignment