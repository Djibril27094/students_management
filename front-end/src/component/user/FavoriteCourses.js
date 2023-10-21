import React,{useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

function FavoriteCourses() {
    const [courseData, setStudentData] = useState([])
    const student_id = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(baseUrl + "/fetch-favorite-courses/" + student_id)
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
                    <h3 className="card-header">Favorite Courses</h3>
                    <div className="card-body">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courseData.map((row , index) =>
                                    <tr>
                                        <td><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></td>
                                        <td><Link to={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
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

export default FavoriteCourses