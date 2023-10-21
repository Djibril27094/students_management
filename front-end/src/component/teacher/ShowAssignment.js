import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function ShowAssignment() {

    const [assignmentData, setAssignmentData] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const { teacher_id } = useParams()
    const { student_id } = useParams()
    
    
    useEffect(() => {
        axios.get(baseUrl +"/student-assignment/" + teacher_id + '/'+student_id)
        .then(res => {
            setAssignmentData(res.data)
            setTotalResult(res.data.length)
        }).catch(err => {
            console.log(err);
        })
    },[teacher_id , student_id])

  return (
    <div className='mt-4 container'>
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <section className="col-md-9">
                <div className="card">
                <h3 className="card-header">All Assignment ({ totalResult })<Link to={`/add-assignment/${student_id}/${teacher_id}`} className='float-end'>Add Assignment</Link></h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentData.map((row , index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{row.title}</td>
                                        <td>
                                            {
                                                row.student_status === true && 
                                                <span className='badge bg-success'>Completed</span>
                                            }
                                            {
                                                row.student_status === false && 
                                                <span className='badge bg-warning'>Pending</span>
                                            }
                                        </td>
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

export default ShowAssignment