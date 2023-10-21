import React , {useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"


const baseUrl = 'http://localhost:8000/api'

const initialChapterData = {
    title: '',
    detail:'',
}


function AddAssignment() {
    
    const [assignmentData, setAssignmentData] = useState(initialChapterData)
    const { student_id } = useParams()
    const { teacher_id } = useParams()
    const handleChange = e => {
        setAssignmentData({
            ...assignmentData,
            [e.target.name]:e.target.value
        })
    }

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("teacher", teacher_id)
        _formData.append("student", student_id)
        _formData.append("title", assignmentData.title)
        _formData.append("detail", assignmentData.detail)
        
        axios.post(baseUrl + '/student-assignment/'+ teacher_id +'/'+student_id , _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            Swal.fire({
                title:"Assignement has been added",
                icon:"success",
                toast:true,
                timer:4000,
                position:'top-right',
                timerProgressBar:true,
                showConfirmButton:false
            }) 

            const _notifData = new FormData()
            _notifData.append('student', student_id)
            _notifData.append('teacher', teacher_id)
            _notifData.append('notif_subject','assignment')
            _notifData.append('notif_for','student')

            axios.post(baseUrl + '/save-notification' , _notifData, {
                headers: {
                    'content-type':'multipart/form-data'
                }
            })
            .then(res => {
                console.log('Notification add');
            }).catch(err => {
                console.log(err);
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
                    <h5 className="card-header">Add Assignment</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className='form-label'>Title</label>
                                <input type="text" onChange={handleChange} name="title" id="title" className='form-control' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="detail" className='form-label'>Detail</label>
                                <input type="text" onChange={handleChange} name="detail" id="detail" className='form-control' />
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

export default AddAssignment