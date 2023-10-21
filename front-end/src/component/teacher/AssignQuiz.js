import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import CheckQuizinCourse from './CheckQuizinCourse'

const baseUrl = "http://localhost:8000/api"
function AssignQuiz() {
    const teacherId=localStorage.getItem("teacherId")
    const [quizData, setQuizData] = useState([])
    const [courseData, setCourseData] = useState([])

    const {course_id} = useParams()
    useEffect(() => {

        axios.get(baseUrl + "/teacher-quiz/" + teacherId)
        .then(res => {
            setQuizData(res.data)
        }).catch(err => {
            console.log(err);
        })

        try {
            axios.get(baseUrl + "/course/" + course_id)
            .then(res => {
                setCourseData(res.data)
            })
        }catch(err) {
            console.log(err);
        }

    },[teacherId , course_id])
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">Assign Quiz <span className='text-primary'>({courseData.title})</span></h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((quiz , index) =>{
                                    return(
                                        <tr key={index}>
                                           
                                            <td>
                                                <Link to={'/all-questions/'+quiz.id}>{quiz.title}</Link> 
                                            </td>
                                            <CheckQuizinCourse quiz={quiz.id} course={course_id} />
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

export default  AssignQuiz