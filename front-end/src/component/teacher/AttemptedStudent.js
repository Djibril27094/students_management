import React, {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import QuizResult from './QuizResult'

const baseUrl = "http://localhost:8000/api"

function AttemptedStudent() {

    const [studentData, setStudentData] = useState([])
    const {quiz_id} = useParams()

    useEffect(() => {
        axios.get(baseUrl + "/attempted-quiz/" + quiz_id)
        .then(res => {
            setStudentData(res.data)
        }).catch(err => {
            console.log(err);
        }) 
    },[quiz_id])
    
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">Student List</h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((row , index) =>
                                    <tr key={index}>
                                        <td>{row.student.full_name}</td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${row.id}`}>
                                                Quiz result
                                            </button>
                                            <div className="modal fade" id={`exampleModal${row.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <QuizResult quiz={row.quiz.id} student={row.student.id}/>
                                            </div>
                                        </td>
                                    </tr>  
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default  AttemptedStudent