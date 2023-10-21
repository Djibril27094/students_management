import React, {useState , useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from 'sweetalert2'
const baseUrl = 'http://localhost:8000/api'

function  QuizQuestions() {

    const [ questionData,  setQuestionData] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const {  quiz_id } = useParams()
    
    useEffect(() => {
        axios.get(baseUrl +"/quiz-questions/" +  quiz_id)
        .then(res => {
            setQuestionData(res.data)
            setTotalResult(res.data.length)
        }).catch(err => {
            console.log(err);
        })
    },[ quiz_id])

    const handleDeleteClick = ( question_id)=> {
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
                    axios.delete(baseUrl + '/question/' +  question_id)
                    .then(res => {
                        axios.get(baseUrl +"/quiz-questions/" +  quiz_id)
                        .then(res => {
                            setQuestionData(res.data)
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
                    <h3 className="card-header d-flex justify-content-between">All  questions ({ totalResult })
                        <button className='btn btn-success btn-sm p-2'><Link className='text-white' to={`/teacher/add-quiz-question/${quiz_id}`}>Add  question</Link></button>
                    </h3>
                    
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { questionData.map(( question , index) =>{
                                return(
                                    <tr key={index}>
                                        <td><Link to={`/edit-question/${question.id}/`}>{ question.question}</Link></td>
                                        <td>
                                            <Link to={`/edit-question/${question.id}`} className="btn btn-info btn-sm mx-2"><i className="bi bi-pencil-square"></i></Link>
                                            <button onClick={()=>handleDeleteClick( question.id)} to={`/delete- question/${ question.id}`} className="btn btn-danger btn-sm"><i className="bi bi-trash"></i></button>
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

export default  QuizQuestions