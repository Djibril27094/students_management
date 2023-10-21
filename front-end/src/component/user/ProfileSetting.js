import React , {useEffect , useState} from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import Swal from "sweetalert2"

const baseUrl = "http://localhost:8000/api"

const initialData = {
    'full_name':'',
    'email':"",
    "password":"",
    'username':'',
    'interested_categories':'',
    'prev_img': '',
    'profile_img':'',
    'verify_status':'',
    'login_via_otp':'',
}


function ProfileSetting() {

    const studentId=localStorage.getItem("studentId")
    const [studenData, setStudenData] = useState(initialData)
    // const [error, setError] = useState(null)

    useEffect(() => {
         
        try {
            axios.get(`${baseUrl}/student/${studentId}`)
            .then(res => {
                console.log(res.data);
                setStudenData({
                    full_name:res.data.full_name,
                    email: res.data.email,
                    password:res.data.password,
                    username:res.data.username,
                    prev_img: res.data.profile_img,
                    profile_img:'',
                    interested_categories: res.data.interested_categories,
                    login_via_otp: res.data.login_via_otp,
                    verify_status: res.data.verify_status,
                })
            })
        }catch(err) {
            console.log(err);
        }

    },[studentId])

    const handleChange = e => {
        
        setStudenData({
            ...studenData,
            [e.target.name]:e.target.value
        })

    }
    const handleFileChange = (e) => {
        setStudenData({
            ...studenData,
            [e.target.name]:e.target.files[0]
        })
    }
    const handleSubmit = () => {

        const studentFormData = new FormData();
        studentFormData.append("full_name", studenData.full_name)
        studentFormData.append("email", studenData.email)
        studentFormData.append("password", studenData.password)
        studentFormData.append("username", studenData.username)
        studentFormData.append("interested_categories", studenData.interested_categories)
        studentFormData.append("verify_status", studenData.verify_status)
        studentFormData.append("login_via_otp", studenData.login_via_otp)
        if (studenData.profile_img  !== '') {
            studentFormData.append("profile_img" ,studenData.profile_img , studenData.profile_img.name)
        }
        try {
          axios.put(baseUrl+"/student/"+studentId , studentFormData)
          .then((res) => {
            setStudenData(initialData)
            // setErrorData(initialData)
            if (res.status === 200)  {
               
                Swal.fire({
                    title:"Data has been update",
                    icon:"success",
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false
                }) 
                window.location.reload()
                
            }
          })
        }catch(error) {
          console.log(error);
        //   setError("success")
        }
        const studentLoginStatus = localStorage.getItem("studentLoginStatus")

        if (studentLoginStatus !== 'true') {
            window.location.href = '/user-dashboard'
        }
    }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-4">
                <Sidebar /> 
            </aside>
            <section className='col-md-8'>
                <div className="card">
                   <h3 className="card-header">Profile Setting</h3>
                   <div className="card-body">
                        <div className="mb-2 row">
                            <label htmlFor="inputfullName" className="col-sm-2 col-form-label">Full Name</label>
                            <div className="col-sm-10">
                                <input type="text"  onChange={handleChange} name='full_name' value={studenData.full_name} className="form-control" id="inputfullName" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='email' value={studenData.email} className="form-control" id='staticEmail'/>
                            </div>    
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="inputfullName" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='username' value={studenData.username} className="form-control" id="inputfullName" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticProfile" className="col-sm-2 col-form-label">Profile Photo</label>
                            <div className="col-sm-10">
                                <input type="file" onChange={handleFileChange} name="profile_img" className="form-control" id='staticProfile'/>
                                { studenData.prev_img &&
                                    <p className='mt-1'><img src={studenData.prev_img} alt={studenData.prev_img} width="200"/></p>   
                                }    
                            </div>    
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticInterest" className="col-sm-2 col-form-label">Interested Categories</label>
                            <div className="col-sm-10">
                                <textarea type="text" name='interested_categories' onChange={handleChange} value={studenData.interested_categories} className="form-control" id='staticInterest'></textarea>
                                <div className="form-text">Php, Python , Javascript, etc</div>    
                            </div>   
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="inputfullName" className="col-sm-2 col-form-label">Login via OTP</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='login_via_otp' value={studenData.login_via_otp} className="form-control" id="inputfullName" />
                            </div>
                        </div>
                        <hr />
                        <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                   </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default ProfileSetting