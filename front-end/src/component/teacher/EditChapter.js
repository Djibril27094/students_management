import React, {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from "sweetalert2"

const baseUrl = 'http://localhost:8000/api'

const initialChapterData = {
    course:'',
    title: '',
    description:'',
    prev_video: '',
    video: '',
    remarks:''
}

function EditChapter() {

    const [chapterData, setChapterData] = useState(initialChapterData)
    
    const {chapter_id} = useParams()

    useEffect(() => {
        axios.get(baseUrl +"/chapter/" + chapter_id)
        .then(res => {
            console.log(res.data);
            setChapterData({
                course:res.data[0].course,
                title: res.data[0].title,
                description:res.data[0].description,
                prev_video: res.data[0].video,
                remarks:res.data[0].remarks,
                video:''
            })
        }).catch(err => {
            console.log(err);
        })

    },[chapter_id])
    
    const handleChange = e => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.value
        })
    }

    

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("course", chapterData.course)
        _formData.append("title", chapterData.title)
        _formData.append("description", chapterData.description)
        if(chapterData.video !== ""){
            _formData.append("video", chapterData.video , chapterData.video.name)
        }else {
            _formData.append("video", chapterData.prev_video , chapterData.prev_video.name)
        }
        
        _formData.append("remarks", chapterData.remarks)
        
        axios.put(`${baseUrl}/chapter/${chapter_id}/` , _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200)  {
               
                Swal.fire({
                    title:"Chapter has been update",
                    icon:"success",
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                }) 
            }
            
        }).catch(err => {
            console.log(err);
        })
    }
    const handleChangeFiles = e => {
        setChapterData({
            ...chapterData,
            [e.target.name]:e.target.files[0]
        })
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-4">
                    <TeacherSidebar />
                </aside>
                <div className="col-md-8">
                    <div className="card">
                        <h5 className="card-header">Edit Chapiter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className='form-label'>Title</label>
                                    <input type="text" value={chapterData.title} onChange={handleChange} name="title" id="title" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className='form-label'>Description</label>
                                    <input type="text" value={chapterData.description} onChange={handleChange} name="description" id="description" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className='form-label'>Video</label>
                                    <input type="file" onChange={handleChangeFiles} name="video" id="video" className='form-control'/>
                                    { chapterData.prev_video &&
                                        <video controls width="100%" className='mt-2'>
                                            <source src={chapterData.prev_video} type="video/mp4"/>
                                        </video>    
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarks">Remarks</label>
                                    <input type="text" value={chapterData.remarks} onChange={handleChange} name="remarks" id="remarks" className='form-control' placeholder='This is video is focused on basic introduction'/>
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

export default EditChapter