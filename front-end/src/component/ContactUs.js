import React , { useEffect , useState } from 'react'
import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/api/contact/"

const initialData = {
  'full_name':'',
  'email':"",
  'query':'',
}

function ContactUs() {
  
  const [contactData, setContactData] = useState(initialData)

  useEffect(() => {
    document.title = "Contact Us"
  })

  const handleChange = (e) => {
    
    // end error
    //teacher
    setContactData({
      ...contactData,
      [e.target.name]:e.target.value
    })
    //end teacher
  }

  const handleSubmit = () => {

    const teacherFormData = new FormData();
    teacherFormData.append("full_name", contactData.full_name)
    teacherFormData.append("email", contactData.email)
    teacherFormData.append("query_txt", contactData.query)

    try {
      axios.post(baseUrl , teacherFormData).then((res) => {
        setContactData(initialData)
      })
    }catch(error) {
      console.log(error);
    }
  }


  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className="col-md-5 offset-2">
          <div className="card">
            <h3 className="card-header">Contact Us</h3>
            <div className="card-body">
              {/*<form> */}
                <div className="mb-3">
                  <label htmlFor="exampleInputFullName" className="form-label">FullName</label>
                  <input onChange={handleChange} value={contactData.full_name} name="full_name" type="text" className="form-control" id="exampleInputFullName" aria-describedby="UsernameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                  <input onChange={handleChange} value={contactData.email} name="email" type="email" className="form-control" id="exampleInputEmail" aria-describedby="UsernameHelp" />
*                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputInterested" className="form-label">Query</label>
                  <textarea rows="8" onChange={handleChange} value={contactData.query} name='query' id="exampleInputInterested" className='form-control'></textarea>
                </div>
                
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Send</button>
              {/*</form>*/}
            </div>
          </div>
        </div>
        <div className="col-4 offset-1">
          <h3 className="border-bottom">Adress</h3>
          <ul className="list-group">
            <li style={{listStyleType:'none'}}>
              <label htmlFor="">Adress: </label>
              <span>Conakry Dixin &nbsp;</span>
            </li>
            <li style={{listStyleType:'none'}}>
              <label htmlFor="">Mobile: </label>
              <span>00224629256106 &nbsp;</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default ContactUs