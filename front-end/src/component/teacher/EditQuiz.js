import React  , { useState , useEffect } from 'react'
import Sidebar from './TeacherSidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"

const initialCourseData = {
    title: '',
    detail:'',
}

function EditQuiz() {

    const [quizData, setQuizData] = useState(initialCourseData)
    
    const {quiz_id} = useParams() 
    useEffect(() => {

        try {
            axios.get(`${baseUrl}/teacher-quiz-detail/${quiz_id}`)
            .then(res => {
                setQuizData({
                    title: res.data.title,
                    detail: res.data.detail,
                })
            })
        }catch {

        }

    },[quiz_id])
    
    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]:e.target.value
        })
    }


    const formSubmit = () => {
        const teacherId = localStorage.getItem("teacherId")
        const _formData = new FormData()
        _formData.append("teacher", teacherId)
        _formData.append('title' ,quizData.title)
        _formData.append("detail", quizData.detail)
        axios.put(`${baseUrl}/teacher-quiz-detail/${quiz_id}` , _formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            setQuizData(initialCourseData)
            window.location.href = "/teacher/quiz"
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <Sidebar /> 
            </aside>
            <section className='col-md-9'>
                <div className="card">
                   <h3 className="card-header">Edit Courses</h3>
                   <div className="card-body">
                        <div className="mb-2 row">
                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                            <input type="text" onChange={handleChange} value={quizData.title} name='title' className="form-control" id="inputTitle" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                            <textarea id="exampleInputDescription" value={quizData.detail} name='detail' onChange={handleChange} className='form-control'></textarea>
                        </div>
                        <hr />
                        <button className="btn btn-primary" onClick={formSubmit}>Submit</button>
                   </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default EditQuiz