import React, {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import Swal from 'sweetalert2'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"
function AllQuiz() {
    const teacherId=localStorage.getItem("teacherId")
    const [quizData, setQuizData] = useState([])
    const [totalResult, setTotalResult] = useState(0);
    useEffect(() => {
        axios.get(baseUrl + "/teacher-quiz/" + teacherId).then(res => {
            setQuizData(res.data)
            setTotalResult(res.data.length)
        }).catch(err => {
            console.log(err);
        }) 
    },[teacherId])
    

    const handleDeleteClick = (quiz_id)=> {
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
                    axios.delete(baseUrl + '/teacher-quiz-detail/' + quiz_id)
                    .then(res => {
                        axios.get(baseUrl +"/teacher-quiz/" + teacherId)
                        .then(res => {
                            setQuizData(res.data)
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
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h3 className="card-header">My Quiz {totalResult}</h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizData.map((quiz , index) =>{
                                    return(
                                        <tr key={index}>
                                           
                                            <td>
                                                <Link to={'/all-questions/'+quiz.id}>{quiz.title}</Link> 
                                            </td>
                                            <td>
                                                <Link to={`/teacher/edit-quiz/${quiz.id}`} className='btn btn-info btn-sm'>Edit</Link>
                                                <Link to={`/teacher/add-quiz-question/${quiz.id}`} className='btn btn-success btn-sm ms-2'>Add Question</Link>
                                                <button onClick={()=>handleDeleteClick(quiz.id)} to={`/delete-chapter/${quiz.id}`} className="btn btn-danger btn-sm ms-sm-2">Delete</button>
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

export default  AllQuiz