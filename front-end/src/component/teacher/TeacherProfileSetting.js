import React , {useEffect , useState} from 'react'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios'
import Swal from "sweetalert2"
import { useNavigate } from 'react-router-dom'

const baseUrl = "http://localhost:8000/api"

const initialData = {
    'full_name':'',
    'email':"",
    "password":"",
    'qualification':'',
    'mobile_no':'',
    'skills': '',
    'prev_img': '',
    'profile_img':'',
    'verify_status':'',
    "facebook_url": '',
    "twitter_url": '',
    "instagram_url": '',
    "website_url": '',
    'login_via_otp':'',
}


function TeacherProfileSetting() {

    const navigate = useNavigate()
    const teacherId=localStorage.getItem("teacherId")
    const [teacherData, setTeacherData] = useState(initialData)
    // const [error, setError] = useState(null)

    useEffect(() => {
         
        try {
            axios.get(`${baseUrl}/teacher/${teacherId}`)
            .then(res => {
                console.log(res.data);
                setTeacherData({
                    full_name:res.data.full_name,
                    email: res.data.email,
                    password:res.data.password,
                    qualification: res.data.qualification,
                    mobile_no:res.data.mobile_no,
                    skills:res.data.Skills,
                    prev_img: res.data.profile_img,
                    profile_img:'',
                    verify_status:res.data.verify_status,
                    facebook_url:res.data.facebook_url,
                    twitter_url:res.data.twitter_url,
                    instagram_url:res.data.instagram_url,
                    website_url:res.data.website_url,
                    login_via_otp:res.data.login_via_otp,
                })
            })
        }catch(err) {
            console.log(err);
        }

    },[teacherId])

    const handleChange = e => {
        
        setTeacherData({
            ...teacherData,
            [e.target.name]:e.target.value
        })

    }
    const handleFileChange = (e) => {
        setTeacherData({
            ...teacherData,
            [e.target.name]:e.target.files[0]
        })
    }
    const handleSubmit = () => {

        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("Skills", teacherData.skills)
        teacherFormData.append("verify_status", teacherData.verify_status)
        teacherFormData.append("facebook_url", teacherData.facebook_url)
        teacherFormData.append("twitter_url", teacherData.twitter_url)
        teacherFormData.append("instagram_url", teacherData.instagram_url)
        teacherFormData.append("website_url", teacherData.website_url)
        teacherFormData.append("login_via_otp", teacherData.login_via_otp)
        if (teacherData.profile_img  !== '') {
            teacherFormData.append("profile_img" ,teacherData.profile_img , teacherData.profile_img.name)
        }
        try {
          axios.put(baseUrl+"/teacher/"+teacherId , teacherFormData).then((res) => {
            setTeacherData(initialData)
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
        const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")

        if (teacherLoginStatus !== 'true') {
            navigate('/teacher/dashboard')
            // window.location.href = '/teacher/dashboard'
        }
    }
  return (
    <div className="container mt-4">
        <div className="row">
            <aside className="col-md-3">
                <TeacherSidebar /> 
            </aside>
            <section className='col-md-9'>
                <div className="card">
                   <h3 className="card-header">Profile Setting</h3>
                   <div className="card-body">
                        <div className="mb-2 row">
                            <label htmlFor="inputfullName" className="col-sm-2 col-form-label">Full Name</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='full_name' value={teacherData.full_name} className="form-control" id="inputfullName" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='email' value={teacherData.email} className="form-control" id='staticEmail'/>
                            </div>    
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticProfile" className="col-sm-2 col-form-label">Profile Photo</label>
                            <div className="col-sm-10">
                                <input type="file" onChange={handleFileChange} name="profile_img" className="form-control" id='staticProfile'/>
                                { teacherData.prev_img &&
                                    <p className='mt-1'><img src={teacherData.prev_img} alt={teacherData.prev_img} width="200"/></p>   
                                }    
                            </div>    
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="staticInterest" className="col-sm-2 col-form-label">Skills</label>
                            <div className="col-sm-10">
                                <textarea type="text" name='Skills' onChange={handleChange} value={teacherData.skills} className="form-control" id='staticInterest'></textarea>
                                <div className="form-text">Php, Python , Javascript, etc</div>    
                            </div>   
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="qualification" className="col-sm-2 col-form-label">Qualification</label>
                            <div className="col-sm-10">
                                <textarea type="text" name='qualification' onChange={handleChange} value={teacherData.qualification} className="form-control" id='qualification'></textarea>
                                <div className="form-text">BCA | MCA</div>    
                            </div>   
                        </div>  
                        <div className="mb-2 row">
                            <label htmlFor="login_via_otp" className="col-sm-2 col-form-label">Login via OTP</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='login_via_otp' value={teacherData.login_via_otp} className="form-control" id='login_via_otp'/>
                            </div>    
                        </div>
                        <hr />
                        <h4 className='my-4'>Social Accounts</h4>
                        <div className="mb-2 row">
                            <label htmlFor="facebook_url" className="col-sm-2 col-form-label">Facebook</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='facebook_url' value={teacherData.facebook_url} className="form-control" id="facebook_url" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="twitter_url" className="col-sm-2 col-form-label">Twitter</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='twitter_url' value={teacherData.twitter_url} className="form-control" id="twitter_url" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="instagram_url" className="col-sm-2 col-form-label">Instagram</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='instagram_url' value={teacherData.instagram_url} className="form-control" id="instagram_url" />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label htmlFor="website_url" className="col-sm-2 col-form-label">Website</label>
                            <div className="col-sm-10">
                                <input type="text" onChange={handleChange} name='website_url' value={teacherData.website_url} className="form-control" id="website_url" />
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

export default TeacherProfileSetting