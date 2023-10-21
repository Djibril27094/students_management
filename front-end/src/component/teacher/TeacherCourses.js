import React, {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"
function TeacherMyCourses() {
    const teacherId=localStorage.getItem("teacherId")
    const [courseData, setCourseData] = useState([])
    useEffect(() => {
        axios.get(baseUrl + "/teacher-course/" + teacherId).then(res => {
            setCourseData(res.data)

        }).catch(err => {
            console.log(err);
        }) 
    },[teacherId])
    
    

  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">My Courses</h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Total Enrolled</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course , index) =>{
                                    return(
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/all-chapters/${course.id}`}>{course.title}</Link>
                                                <hr />
                                                {course.course_rating === null && 
                                                    <span>Rating: 0/5</span>
                                                }
                                                {course.course_rating !== null && course.course_rating !== "" &&
                                                    <span>Rating: {course.course_rating}/5</span>
                                                }
                                            </td>
                                            <td><img src={course.featured_img} alt={course.title} width="60" className='rounded'/></td>
                                            <td><Link to={`/enrolled-student/${course.id}`}>{course.total_enrolled_students}</Link></td>
                                            <td>
                                                <Link className="btn btn-info btn-sm ms-2" to={`/teacher/edit-course/${course.id}`}>Edit</Link>
                                                <Link className="btn btn-warning btn-sm ms-2" to={`/materials-study/${course.id}`}>Study Materiel</Link>
                                                <Link className="btn btn-success btn-sm ms-2" to={`/teacher/addChapter/${course.id}`}>Add chapter</Link>
                                                <Link className="btn btn-primary btn-sm ms-2" to={`/assign-course/${course.id}`}>Assign Quiz</Link>
                                                <button className="btn btn-danger btn-sm ms-2">Delete</button>
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

export default  TeacherMyCourses