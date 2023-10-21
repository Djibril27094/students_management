import React, {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import MessageList from '../MessageList'

const baseUrl = "http://localhost:8000/api"

const initialData = {
    msg_text: '',
}



function UserList() {

    const [groupMsgData, setGroupMsgData] = useState(initialData)
    const [msgData, setMsgData] = useState(initialData)
    const teacher_id = localStorage.getItem("teacherId")
    const [studentData, setStudentData] = useState([])

    const [successMsg, setSuccessMsg] = useState();
    const [groupSuccessMsg, setGroupSuccessMsg] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [groupErrorMsg, setGroupErrorMsg] = useState();

    useEffect(() => {
        axios.get(baseUrl + "/fetch-all-enrolled-student/" + teacher_id)
        .then(res => {
            setStudentData(res.data)
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        }) 
    },[teacher_id])
    
    const formSubmit = (student_id) => {
        const _formData = new FormData()

        _formData.append("msg_text", msgData.msg_text)
        _formData.append("msg_from", 'teacher')
        
        axios.post(baseUrl + '/send-message/'+ teacher_id +'/'+student_id , _formData)
        .then(res => {
           if(res.data.bool === true) {
                setSuccessMsg(res.data.msg)
                setErrorMsg('')
                setMsgData({
                    'msg_text':''
                })
           }else {
            setSuccessMsg('')
            setErrorMsg(res.data.msg)
           }
        }).catch(err => {
            console.log(err);
        })
    }
    
    const groupFormSubmit = () =>{
        const _formData = new FormData()

        _formData.append("msg_text", groupMsgData.msg_text)
        _formData.append("msg_from", 'teacher')
        
        axios.post(baseUrl + '/send-group-message/' + teacher_id, _formData)
        .then(res => {
           if(res.data.bool === true) {
                setGroupSuccessMsg(res.data.msg)
                setGroupErrorMsg('')
                setGroupMsgData({
                    'msg_text':''
                })
           }else {
            setGroupSuccessMsg('')
            setGroupErrorMsg(res.data.msg)
           }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleChange = e => {
        setMsgData({
            ...msgData,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeGroup = e => {
        setGroupMsgData({
            ...groupMsgData,
            [e.target.name]:e.target.value
        })
    }

  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">
                        All Student List
                        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                            Send Message
                        </button>
                    </h3>
                    <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Send Message to All Students </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <span className='text-success'>{groupSuccessMsg}</span>
                                    <span className='text-success'>{groupErrorMsg}</span>
                                    <div className='mb-2'>
                                        <label htmlFor="msg_text" className='form-label'>Message</label>
                                        <textarea name="msg_text" onChange={handleChangeGroup} value={groupMsgData.msg_text} id="msg_text" cols="10" rows="5" className='form-control'></textarea>
                                    </div>
                                    <button className='btn btn-primary' onClick={groupFormSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Interested categories</th>
                                    <th>Assignemment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentData.map((row , index) =>{
                                    return(
                                        <tr key={index}>
                                            <td>{row.student.full_name}</td>
                                            <td>{row.student.email}</td>
                                            <td>{row.student.username}</td>
                                            <td>{row.student.interested_categories}</td>
                                            <td>
                                                <Link to={`/show-assignment/${row.student.id}/${teacher_id}`} className='btn btn-sm btn-warning mb-2'>Assignments</Link>
                                                <Link to={`/add-assignment/${row.student.id}/${teacher_id}`} className='btn btn-sm btn-success'>Add Assignments</Link>
                                                <button className='ms-2 btn-dark' title='Send Message' data-bs-toggle="modal" data-bs-target={`#msgModal${index}`}><i className="bi bi-chat-fill"></i></button>    
                                                <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">
                                                                    <span className='text-danger'>{row.student.username}</span>
                                                                    
                                                                </h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="row">
                                                                        {/** From Another user */}
                                                                    <MessageList teacher_id={teacher_id} student_id={row.student.id}/>
                                                                    <div className="col-md-3">
                                                                        <span className='text-success'>{successMsg}</span>
                                                                        <span className='text-success'>{errorMsg}</span>
                                                                        <div className='mb-2'>
                                                                            <label htmlFor="msg_text" className='form-label'>Message</label>
                                                                            <textarea name="msg_text" onChange={handleChange} value={msgData.msg_text} id="msg_text" cols="10" rows="5" className='form-control'></textarea>
                                                                        </div>
                                                                        <button className='btn btn-primary' onClick={()=>formSubmit(row.student.id)}>Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                
                                                        </div>
                                                    </div>
                                                </div>
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

export default  UserList