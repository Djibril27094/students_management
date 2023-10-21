import React, {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"
function CheckQuizStatusForStudent(props) {

    const [quizData, setQuizData] = useState({bool:""})
    
    useEffect(() => {
        axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
        .then(res => {
            setQuizData(res.data)        
        }).catch(err => {
            console.log(err);
        })
    },[props.quiz,props.student])
    
  return (
    <td>
        {
            quizData.bool === false && 
            <Link to={`/takes-quiz/${props.quiz}`} className='btn btn-success btn-sm'>Take Quiz</Link>
        }
        {
            quizData.bool === true && 
            <span className='text-success'>Attempted</span> 
        }
    </td>
  )
}

export default   CheckQuizStatusForStudent