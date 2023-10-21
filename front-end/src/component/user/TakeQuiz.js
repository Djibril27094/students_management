import React, {useState , useEffect, Fragment} from 'react'
import {Link, useParams} from 'react-router-dom'
import Sidebar from './Sidebar'
import axios from 'axios'
import Swal from "sweetalert2"

const baseUrl = "http://localhost:8000/api"
function TakeQuiz() {
    const [ questionData,  setQuestionData] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const {  quiz_id } = useParams()

    const studentId = localStorage.getItem("studentId")

    useEffect(() => {
        axios.get(baseUrl +"/quiz-questions/" +  quiz_id + "/1")
        .then(res => {
            setQuestionData(res.data)
            setTotalResult(res.data.length)
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
        document.title = "Attempt Quiz"
    },[ quiz_id])

    const submitAnswer = (question_id , right_ans)=> {
        const _formData = new FormData()
        _formData.append("student", studentId)
        _formData.append("quiz", quiz_id)
        _formData.append("question",question_id)
        _formData.append("right_ans", right_ans)
        
        axios.post(baseUrl + '/attempt-quiz/', _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                axios.get(`${baseUrl}/quiz-questions/${quiz_id}/next-question/${question_id}`)
                .then(res => {
                    setQuestionData(res.data)
                    setTotalResult(res.data.length)
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
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
                <h4 className='mb-3  border-bottom pb-1'>Quiz Title</h4>
                {
                    questionData.map((row , index) =>
                <div className="card">
                 
                    <h3 className="card-header">Question title </h3>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                <tr>
                                    <button onClick={()=>submitAnswer(row.id , row.ans1)} className='btn btn-outline-secondary my-2'>{row.ans1}</button>
                                </tr>
                                <tr>
                                    <button onClick={()=>submitAnswer(row.id , row.ans2)} className='btn btn-outline-secondary my-2'>{row.ans2}</button>
                                </tr>
                                <tr>
                                    <button onClick={()=>submitAnswer(row.id , row.ans3)} className='btn btn-outline-secondary my-2'>{row.ans3}</button>
                                </tr> 
                                <tr>
                                    <button onClick={()=>submitAnswer(row.id , row.ans4)} className='btn btn-outline-secondary my-2'>{row.ans4}</button>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                )
            }
            </section>
        </div>
    </div>
  )
}

export default  TakeQuiz