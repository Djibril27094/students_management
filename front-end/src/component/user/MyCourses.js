import React,{useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

function MyCourses() {
    const [courseData, setStudentData] = useState([])
    const student_id = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(baseUrl + "/fetch-enrolled-courses/" + student_id)
        .then(res => {
            setStudentData(res.data)
            console.log(res.data);
        })
    }, [student_id]);

    useEffect(() => {
        document.title = "My Courses"
    }, []);
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className="col-md-8">
                <div className="card">
                    <h3 className="card-header">My Courses</h3>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Created By</th>
                                    <th>Quiz</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courseData.map((row , index) =>
                                    <tr>
                                        <td><Link to={`/detail/${row.course.id}`}>{row.course.title}</Link></td>
                                        <td><Link to={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                        <td>
                                        <Link to={`/course-quiz/${row.course.id}`} className='btn btn-warning me-2'>Quiz List</Link>
                                    <Link to={`/user/materials-study/${row.course.id}`} className='btn btn-primary'>Study Material</Link>
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

export default MyCourses