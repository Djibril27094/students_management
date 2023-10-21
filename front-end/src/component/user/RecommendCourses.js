import React,{useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

function RecommendCourses() {
    const [courseData, setStudentData] = useState([])
    const student_id = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(baseUrl + "/fetch-recommended-courses/" + student_id)
        .then(res => {
            setStudentData(res.data)
            console.log(res.data);
        })
    }, [student_id]);
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className="col-md-8">
                <div className="card">
                    <h3 className="card-header">Recommend courses</h3>
                    <div className="card-body">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Technologies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courseData.map((course , index) =>
                                    <tr>
                                        <td><Link to={`/detail/${course.id}`}>{course.title}</Link></td>
                                        <td>{course.techs}</td>
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

export default RecommendCourses