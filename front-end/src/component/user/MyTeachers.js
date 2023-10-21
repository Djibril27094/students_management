import React,{useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'
import MessageList from '../MessageList'

const baseUrl = "http://localhost:8000/api"
const initialData = {
    msg_text: '',
}
function MyTeachers() {
    const [groupMsgData, setGroupMsgData] = useState(initialData)
    const [msgData, setMsgData] = useState(initialData)
    const [teacherData, setTeacherData] = useState([])

    const [successMsg, setSuccessMsg] = useState();
    const [groupSuccessMsg, setGroupSuccessMsg] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [groupErrorMsg, setGroupErrorMsg] = useState();

    const student_id = localStorage.getItem("studentId")

    const formSubmit = (teacher_id) => {
        const _formData = new FormData()

        _formData.append("msg_text", msgData.msg_text)
        _formData.append("msg_from", 'student')
        
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

    useEffect(() => {
        axios.get(baseUrl + "/fetch-my-teachers/" + student_id)
        .then(res => {
            setTeacherData(res.data)
            console.log(res.data);
        })
    }, [student_id]);
    useEffect(() => {
        document.title = "My teachers"
    }, []);

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

    const groupFormSubmit = () =>{
        const _formData = new FormData()

        _formData.append("msg_text", groupMsgData.msg_text)
        _formData.append("msg_from", 'student')
        
        axios.post(baseUrl + '/send-group-message-from-student/' + student_id, _formData)
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
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className="col-md-8">
                <div className="card">
                    <h3 className="card-header">
                        All Teachers List
                        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                            Send Message
                        </button>    
                    </h3>
                    <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Send Message to All Teachers </h5>
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
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teacherData.map((row , index) =>
                                    <tr>
                                        <td><Link to={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link></td>
                                        <td>
                                            <button className='ms-2 btn-dark' title='Send Message' data-bs-toggle="modal" data-bs-target={`#msgModal${index}`}><i className="bi bi-chat-fill"></i></button>    
                                            <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">
                                                                <span className='text-danger'>{row.teacher.full_name}</span>
                                                                
                                                            </h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                    {/** From Another user */}
                                                                <MessageList teacher_id={row.teacher.id} student_id={student_id} verify={true}/>
                                                                <div className="col-md-3">
                                                                    <span className='text-success'>{successMsg}</span>
                                                                    <span className='text-success'>{errorMsg}</span>
                                                                    <div className='mb-2'>
                                                                        <label htmlFor="msg_text" className='form-label'>Message</label>
                                                                        <textarea name="msg_text" onChange={handleChange} value={msgData.msg_text} id="msg_text" cols="10" rows="5" className='form-control'></textarea>
                                                                    </div>
                                                                    <button className='btn btn-primary' onClick={()=>formSubmit(row.teacher.id)}>Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                            
                                                    </div>
                                                </div>
                                            </div>
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

export default MyTeachers