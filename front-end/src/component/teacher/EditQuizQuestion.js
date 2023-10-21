import React, {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from "sweetalert2"

const baseUrl = 'http://localhost:8000/api'

const initialChapterData = {
    quiz: '',
    question:'',
    ans1: '',
    ans2: '',
    ans3: '',
    ans4: '',
    right_ans:''
}

function   EditQuizQuestion() {

    const [ questionData,  setQuestionData] = useState(initialChapterData)
    
    const { question_id} = useParams()

    useEffect(() => {
        axios.get(baseUrl +"/question/" +  question_id)
        .then(res => {
            console.log(res.data);
             setQuestionData({
                quiz: res.data.quiz.id,
                question:res.data.question,
                ans1: res.data.ans1,
                ans2: res.data.ans2,
                ans3: res.data.ans3,
                ans4: res.data.ans3,
                right_ans:res.data.right_ans
            })
        }).catch(err => {
            console.log(err);
        })

    },[ question_id])
    
    const handleChange = e => {
         setQuestionData({
            ...questionData,
            [e.target.name]:e.target.value
        })
    }

    

    const formSubmit = () => {
        const _formData = new FormData()
        _formData.append("quiz", questionData.quiz)
        _formData.append("question", questionData.question)
        _formData.append("ans1", questionData.ans1)
        _formData.append("ans2", questionData.ans2)
        _formData.append("ans3", questionData.ans3)
        _formData.append("ans4", questionData.ans4)
        _formData.append("right_ans", questionData.right_ans)
        
        axios.put(`${baseUrl}/question/${question_id}` , _formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        }).then(res => {
            if (res.status === 200)  {
               
                Swal.fire({
                    title:"Question has been update",
                    icon:"success",
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                }) 
                window.location.reload()
            }
            
            
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
                        <h5 className="card-header">Updates Questions</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="question" className='form-label'>Question</label>
                                    <input type="text" onChange={handleChange} name="question" value={questionData.question} id="question" className='form-control' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans1" className='form-label'>Ans 1</label>
                                    <input type="text" onChange={handleChange} name="ans1" value={questionData.ans1} id="ans1" className='form-control'/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans2">Ans 2</label>
                                    <input type="text" onChange={handleChange} name="ans2" value={questionData.ans2} id="ans2" className='form-control'/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans3">Ans 3</label>
                                    <input type="text" onChange={handleChange} name="ans3" value={questionData.ans3} id="ans3" className='form-control'/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans4">Ans 4</label>
                                    <input type="text" onChange={handleChange} name="ans4" value={questionData.ans4} id="ans4" className='form-control'/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="right_ans">Right Answer</label>
                                    <input type="text" onChange={handleChange} name="right_ans" value={questionData.right_ans} id="right_ans" className='form-control'  />
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

export default   EditQuizQuestion