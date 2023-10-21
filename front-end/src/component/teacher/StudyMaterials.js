import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from 'sweetalert2'
const baseUrl = 'http://localhost:8000/api'

function StudyMaterials() {

    const [studyMaterials, setStudyMaterials] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const { course_id } = useParams()

    
    useEffect(() => {
        axios.get(baseUrl +"/study-materials/" + course_id)
        .then(res => {
            setStudyMaterials(res.data)
            setTotalResult(res.data.length)
        }).catch(err => {
            console.log(err);
        })
    },[course_id])

    const downloadFiles = (file_url)=> {
        window.location.href=file_url
    }
    
    const handleDeleteClick = (study_id)=> {
        Swal.fire({
            title:"Confirm",
            text:"Are you sure you want to delete this data",
            icon:"info",
            confirmButtonText:"continue",
            showCancelButton:true
        }).then(result => {
            if (result.isConfirmed) {
                try {
                    Swal.fire("success" , "Data has been deleted.")
                    axios.delete(baseUrl + '/study-material/' + study_id)
                    .then(res => {
                        axios.get(baseUrl +"/study-materials/" + course_id)
                        .then(res => {
                            setStudyMaterials(res.data)
                            setTotalResult(res.data.length)
                        }).catch(err => {
                            console.log(err);
                        })
                    })
                    
                }catch(err) {
                    Swal.fire("success" , "Data has not been deleted.")
                }
            }else {
                Swal.fire("success" , "Data has not been deleted.")
            }
        })    
    }
  return (
    <div className='mt-4 container'>
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar />
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header d-flex justify-content-between">All study materials ({ totalResult })
                        <button className='btn btn-success btn-sm p-2'><Link className='text-white' to={`/add-study/${course_id}`}>Add study</Link></button>
                    </h3>
                    
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Upload</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studyMaterials.map((study , index) =>{
                                return(
                                    <tr key={index}>
                                        <td><Link to={`/edit-study/${study.id}/`}>{study.title}</Link></td>
                                        <td>
                                        <button className='btn btn-outline-primary' onClick={()=>downloadFiles(study.upload)}>Download Files</button>
                                        </td>
                                        <td>{study.remarks}</td>
                                        <td>
                                            <Link to={`/edit-study/${study.id}`} className="btn btn-info btn-sm mx-2"><i className="bi bi-pencil-square"></i></Link>
                                            <button onClick={()=>handleDeleteClick(study.id)} to={`/delete-study/${study.id}`} className="btn btn-danger btn-sm"><i className="bi bi-trash"></i></button>
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

export default StudyMaterials