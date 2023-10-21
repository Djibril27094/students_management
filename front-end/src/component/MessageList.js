import React, {useState , useEffect, Fragment} from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:8000/api"
function MessageList(props) {
    const [msgData, setMsgData] = useState([])
    useEffect(() => {
        axios.get(baseUrl + "/get-message/" + props.teacher_id + "/" + props.student_id)
        .then(res => {
            setMsgData(res.data)
        }).catch(err => {
            console.log(err);
        }) 
    },[props.teacher_id , props.student_id])
    
    const fetchMsgs = ()=> {
        try {
            axios.get(baseUrl+"/get-message/" + props.teacher_id + "/" +props.student_id)
            .then(res => {
                setMsgData(res.data)
                const objDiv = document.getElementById("msgList")
                objDiv.scrollTop = objDiv.scrollHeight;
            })
        }catch {

        }
    }

    const msgList = {
        height: '400px',
        overflow: 'auto',
    }

  return (
    <Fragment>
    <p><span className="ms-5 btn btn-secondary btn-sm" onClick={fetchMsgs} title='Refresh'><i className="bi bi-bootstrap-reboot"></i></span></p>
    <div className="col-md-9 mb-2 col-12 border-end" style={msgList} id="msgList">
        {/** From Another user */}
        {props.verify !== true  && msgData.map((row , index) =>
            <Fragment>
            <div className="row">
                <div className="col-5">
            {row.msg_from !== 'teacher' &&
                    <Fragment>
                        <div className="alert alert-primary mb-1">
                            {row.msg_text}
                        </div>
                        <small className='text-muted'>{row.msg_time}</small>
                    </Fragment>
                }
                </div>
            </div>
        
            <div className="row">
                <div className="offset-7 col-5">
                    {row.msg_from === 'teacher' &&
                        <Fragment>
                            <div className="alert alert-success mb-1">
                                {row.msg_text}
                            </div>
                            <small className='text-muted'>{row.msg_time}</small>
                        </Fragment>
                    }
                </div>
            </div>
            </Fragment>
        )}

        {props.verify === true  && msgData.map((row , index) =>
            <Fragment>
            <div className="row">
            {row.msg_from === 'teacher' &&
                <div className="col-5">
                
                    <Fragment>
                        <div className="alert alert-primary mb-1">
                            {row.msg_text}
                        </div>
                        <small className='text-muted'>{row.msg_time}</small>
                    </Fragment>
                
                </div>
            }
            </div>
        
            <div className="row">
            {row.msg_from !== 'teacher' &&
                <div className="offset-7 col-5">
                    
                        <Fragment>
                            <div className="alert alert-success mb-1">
                                {row.msg_text}
                            </div>
                            <small className='text-muted'>{row.msg_time}</small>
                        </Fragment>
                    
                </div>
            }
                </div>
            </Fragment>
        )}
        
    </div>
    </Fragment>
  )
}

export default  MessageList