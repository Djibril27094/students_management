import React  , { useState , useEffect } from 'react'
import Sidebar from './TeacherSidebar'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

const initialCourseData = {
    category:'',
    title: '',
    description:'',
    f_img: '',
    techs: ''
}

function AddCourses() {

    const [cats , setCats] = useState([])
    const [courseData, setCourseData] = useState(initialCourseData)
    
    useEffect(() => {
        try{
            axios.get(baseUrl + '/category')
            .then(res => {
                setCats(res.data);
                console.log(res.data);
            })
        }catch(error) {
            console.log(error);
        }        
    },[])
    
    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]:e.target.value
        })
    }

    const handleFileChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]:e.target.files[0]
        })
    }

    const formSubmit = () => {
        const _formData = new FormData()
        const teacherId = localStorage.getItem('teacherId')
        _formData.append("category", courseData.category)
        _formData.append("teacher", teacherId)
        _formData.append('title' ,courseData.title)
        _formData.append("description", courseData.description)
        _formData.append("featured_img" ,courseData.f_img , courseData.f_img.name)
        _formData.append("techs", courseData.techs)

        axios.post(baseUrl + '/course/' , _formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            setCourseData(initialCourseData)
            window.location.href = "/teacher/courses"
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
                   <h3 className="card-header">Add Courses</h3>
                   <div className="card-body">
                        <div className="mb-2 row">
                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Category</label>
                            <select name="category" onChange={handleChange} className='form-control'>
                                
                                {cats.map((category , index) => {
                                    return(<option key={index} value={category.id}>{category.title}</option>)
                                })}
                            </select>                            
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                            <input type="text" onChange={handleChange} value={courseData.title} name='title' className="form-control" id="inputTitle" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                            <textarea id="exampleInputDescription" value={courseData.description} name='description' onChange={handleChange} className='form-control'></textarea>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticVideo" className="col-sm-2 col-form-label">Features images</label>
                            <input type="file"  onChange={handleFileChange} name="f_img" className="form-control" id='staticVideo'/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputTechnologie" className="col-form-label">Technologies</label>
                            <textarea id="exampleInputTechnologie" value={courseData.techs} onChange={handleChange} name="techs" className='form-control'></textarea>
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

export default AddCourses