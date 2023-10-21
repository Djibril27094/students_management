import React , {useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2"


const baseUrl = 'http://localhost:8000/api'

const initialChapterData = {
    title: '',
    description:'',
    video: '',
    remarks:''
}


function AddChapter() {
    
    const [chapterData, setChapterData] = useState(initialChapterData)
    const { course_id } = useParams()
    const handleChange = e => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeFiles = e => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.files[0]
        })
    }

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("course", course_id)
        _formData.append("title", chapterData.title)
        _formData.append("description", chapterData.description)
        _formData.append("video", chapterData.video , chapterData.video.name)
        _formData.append("remarks", chapterData.remarks)
        
        axios.post(baseUrl + '/chapter/' + course_id , _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            Swal.fire({
                title:"Chapter has been added",
                icon:"success",
                toast:true,
                timer:3000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
            }) 
            window.location.reload()
        }).catch(err => {
            console.log(err);
        })
    }


  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <div className="col-md-9">
                <div className="card">
                    <h5 className="card-header">Add Chapiter</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className='form-label'>Title</label>
                                <input type="text" onChange={handleChange} name="title" id="title" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className='form-label'>Description</label>
                                <input type="text" onChange={handleChange} name="description" id="description" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="video" className='form-label'>Video</label>
                                <input type="file" onChange={handleChangeFiles} name="video" id="video" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="remarks">Remarks</label>
                                <input type="text" onChange={handleChange} name="remarks" id="remarks" className='form-control' placeholder='This is video is focused on basic introduction'/>
                            </div>
                            <hr />
                            <button type='button' onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddChapter