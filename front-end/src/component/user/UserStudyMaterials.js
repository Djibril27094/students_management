import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function UserStudyMaterials() {

    const [userStudyMaterials, setUserStudyMaterials] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const { course_id } = useParams()

    
    useEffect(() => {
        axios.get(baseUrl +"/user/study-materials/" + course_id)
        .then(res => {
            setUserStudyMaterials(res.data)
            setTotalResult(res.data.length)
        }).catch(err => {
            console.log(err);
        })
    },[course_id])

    const downloadFiles = (file_url)=> {
        window.location.href=file_url
    }
  return (
    <div className='mt-4 container'>
        <div className="row">
            <aside className="col-md-3">
                <Sidebar />
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
                                <th>Detail</th>
                                <th>Upload</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userStudyMaterials.map((study , index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{study.title}</td>
                                        <td>{study.description}</td>
                                        <td>
                                            <button className='btn btn-outline-primary' onClick={()=>downloadFiles(study.upload)}>Download Files</button>
                                        </td>
                                        <td>{study.remarks}</td>
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

export default UserStudyMaterials