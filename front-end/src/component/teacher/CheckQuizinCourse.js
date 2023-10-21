import React, {useState , useEffect, Fragment} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"
function CheckQuizinCourse(props) {
    
    const teacherId=localStorage.getItem("teacherId")
    const [quizData, setQuizData] = useState({bool:""})

    useEffect(() => {

        axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`)
        .then(res => {
            setQuizData(res.data)
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    
    },[props.quiz,props.course])
    

    const assignQuiz = (quiz_id)=> {
        const _formData = new FormData()
        _formData.append("teacher", teacherId)
        _formData.append("course" , props.course)
        _formData.append("quiz", quiz_id)

        try {
            axios.post(baseUrl + '/quiz-assign-course/' , _formData , {
                headers:{
                'content-type':"multipart/form-data"
                }
            }).then(res => {

            if (res.status === 200 || res.status === 201) {
                window.location.reload()
            } 
        })
        }catch(error) {
        console.log(error);
        }    
    }
  return (
    <td>
        {
            quizData.bool === false && 
            <button onClick={()=>assignQuiz(props.quiz)} className='btn btn-success btn-sm'>Assign Quiz</button>
        }
        {
            quizData.bool === true && 
            <Fragment>
                <span className='btn btn-secondary me-2'>Assigned</span> 
                <Link className='btn btn-info' to={`/attempted-students/${props.quiz}`}>Attempted student</Link>
            </Fragment>
        }
    </td>
  )
}

export default   CheckQuizinCourse