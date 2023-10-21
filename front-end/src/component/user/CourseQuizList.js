import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'
import CheckQuizStatusForStudent from './CheckQuizStatusForStudent'

const baseUrl = "http://localhost:8000/api"
function CourseQuizList() {
    const {course_id} = useParams()
    const [quizData, setQuizData] = useState([])
    const studentId = localStorage.getItem("studentId")
    useEffect(() => {
        axios.get(baseUrl + "/fetch-assigned-quiz/" + course_id)
        .then(res => {
            setQuizData(res.data)
        }).catch(err => {
            console.log(err);
        }) 
    },[course_id])
    


  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className="col-md-8">
                <div className="card">
                    <h3 className="card-header">Quiz List</h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((row , index) =>{
                                    return(
                                        <tr key={index}>
                                           
                                            <td>
                                                {row.quiz.title}
                                            </td>
                                            <CheckQuizStatusForStudent quiz={row.quiz.id} student={studentId}/>    
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

export default  CourseQuizList