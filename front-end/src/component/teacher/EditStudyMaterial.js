import React, {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from "sweetalert2"

const baseUrl = 'http://localhost:8000/api'

const initialStudyMaterialData = {
    course:'',
    title: '',
    description:'',
    prev_upload: '',
    upload: '',
    remarks:''
}

function EditStudyMaterial() {

    const [studyMaterialData, setStudyMaterialData] = useState(initialStudyMaterialData)
    
    const {study_id} = useParams()

    useEffect(() => {
        axios.get(baseUrl +"/study-material/" + study_id)
        .then(res => {
            console.log(res.data);
            setStudyMaterialData({
                course:res.data.course.id,
                title: res.data.title,
                description:res.data.description,
                prev_upload: res.data.upload,
                remarks:res.data.remarks,
                upload:''
            })
        }).catch(err => {
            console.log(err);
        })

    },[study_id])
    
    const handleChange = e => {
        setStudyMaterialData({
            ...studyMaterialData,
            [e.target.name]:e.target.value
        })
    }

    

    const formSubmit = () => {
        console.log("ss");
        const _formData = new FormData()
        _formData.append("course", studyMaterialData.course)
        _formData.append("title", studyMaterialData.title)
        _formData.append("description", studyMaterialData.description)
        if(studyMaterialData.upload !== ""){
            _formData.append("upload", studyMaterialData.upload , studyMaterialData.upload.name)
        }else {

        }

        
        _formData.append("remarks", studyMaterialData.remarks)
        
        axios.put(`${baseUrl}/study-material/${study_id}` , _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200 || res.status===201)  {
               
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
        setStudyMaterialData({
            ...studyMaterialData,
            [e.target.name]:e.target.files[0]
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
                        <h5 className="card-header">Edit Chapiter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className='form-label'>Title</label>
                                    <input type="text" value={studyMaterialData.title} onChange={handleChange} name="title" id="title" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className='form-label'>Description</label>
                                    <input type="text" value={studyMaterialData.description} onChange={handleChange} name="description" id="description" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="upload" className='form-label'>Files</label>
                                    <input type="file" onChange={handleChangeFiles} name="upload" id="upload" className='form-control'/>
                                    { studyMaterialData.prev_upload &&
                                        <p className='mt-1'><img src={studyMaterialData.prev_upload} alt={studyMaterialData.prev_upload} width="200"/></p> 
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarks">Remarks</label>
                                    <input type="text" value={studyMaterialData.remarks} onChange={handleChange} name="remarks" id="remarks" className='form-control' placeholder='This is upload is focused on basic introduction'/>
                                </div>
                                <hr />
                                <button type='button' onClick={formSubmit} className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStudyMaterial