import React, {useState , useEffect} from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"

function QuizResult(props) {

    const [resultData, setResultData] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
        .then(res => {
            setResultData(res.data)
        }).catch(err => {
            console.log(err);
        })
    },[props.quiz,props.student])
    
  return (
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Quiz result</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <table className='table table-bordered'>
                <tr>
                    <th>Total Question</th>
                    <td>{resultData.total_questions}</td>
                </tr>
                <tr>
                    <th>Attempted Question</th>
                    <td>{resultData.total_attempted_questions}</td>
                </tr>
                <tr>
                    <th>Total Correct Question</th>
                    <td>{resultData.total_correct_questions}</td>
                </tr>
            </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
  )
}

export default   QuizResult

