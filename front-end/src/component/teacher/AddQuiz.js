import React  , { useState  } from 'react'
import Sidebar from './TeacherSidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialQuizData = {
    title: '',
    detail:'',
}

function AddQuiz() {

    const [quizData, setQuizData] = useState(initialQuizData)
    
    
    const handleChange = (e) => {
        setQuizData({
            ...quizData,
            [e.target.name]:e.target.value
        })
    }


    const formSubmit = () => {
        const _formData = new FormData()
        const teacherId = localStorage.getItem('teacherId')
        _formData.append("teacher", teacherId)
        _formData.append('title' ,quizData.title)
        _formData.append("detail", quizData.detail)
        axios.post(baseUrl + '/quiz/' , _formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            setQuizData(initialQuizData)
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
                   <h3 className="card-header">Add Quiz</h3>
                   <div className="card-body">
                        <div className="mb-2 row">
                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                            <input type="text" onChange={handleChange} value={quizData.title} name='title' className="form-control" id="inputTitle" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputDescription" className="form-label">Detail</label>
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

export default AddQuiz