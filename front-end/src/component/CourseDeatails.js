import React, { useState, useEffect, Fragment } from 'react';
import { Col, Container, Row,Card,ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Swal from "sweetalert2"
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'
const siteUrl = 'http://localhost:8000/'


const CourseDeatails = () => {

  const { course_id } = useParams()
  
  const [courseData, setCourseData] = useState([])
  const [chapterData, setChapterData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [relatedCourseData, setRelatedCourseData] = useState([])
  const [userLoginStatus , setUserLoginStatus] = useState(null)
  const [enrollStatus , setEnrollStatus] = useState(null)
  const [ratingStatus , setRatingStatus] = useState(null)
  const [favoriteStatus , setFavoriteStatus] = useState(null)
  const [avgRating , setAvgRating] = useState(0)
  const [techList , setTechList] = useState([])
  const [courseView, setCourseView] = useState();

  const studentId = localStorage.getItem("studentId")

  useEffect(() =>{
    // Fetch Course
    try {
      axios.get(baseUrl + "/course/" + course_id)
      .then(res => {
        setCourseData(res.data)
        setTeacherData(res.data.teacher)
        setChapterData(res.data.course_chapters)
        setRelatedCourseData(JSON.parse(res.data.related_videos))
        setTechList(res.data.tech_list)
        console.log(res.data)
        if(res.data.course_rating !== "" && res.data.course_rating !== null) {
          console.log(res.data.course_rating);
          setAvgRating(res.data.course_rating)
        }
      })
    }catch(error) {
      console.log(error);
    }
    // Update view
    try {
      axios.get(baseUrl + "/update-view/" + course_id)
      .then(res => {
        console.log(res.data);
        setCourseView(res.data.views)
      })
    }catch (err) {
      console.log(err);
    }
    try {
      axios.get(baseUrl + "/fetch-enroll-status/" + studentId + "/" + course_id)
      .then(res =>{
        if (res.data.bool === true) {
          setEnrollStatus("success")
          // console.log("wee");
        }
      })
    }catch(error) {
      console.log(error);
    }
    try {
      axios.get(baseUrl + "/fetch-rating-status/" + studentId + "/" + course_id)
      .then(res =>{
        console.log("r",res.data);
        if (res.data.bool === true) {
          setRatingStatus("success")
          // console.log("wee");
        }else {
          setRatingStatus('')
        }
      })
    }catch(error) {
      console.log(error);
    }
    try {
      axios.get(baseUrl + "/fetch-favorite-status/" + studentId + "/" + course_id)
      .then(res =>{
        if (res.data.bool === true) {
          setFavoriteStatus ("success")
          // console.log("wee");
        }else {
          setFavoriteStatus('')
        }
      })
    }catch(error) {
      console.log(error);
    }
    const studentLoginStatus = localStorage.getItem("studentLoginStatus")
    if (studentLoginStatus  === 'true') {
      setUserLoginStatus("success")
    }
  },[studentId,course_id])

  const enrollCourse = ()=> {
    
    const _formData = new FormData()
    _formData.append("course" , course_id)
    _formData.append("student", studentId)

    try {
      axios.post(baseUrl + '/student-enroll-course/' , _formData , {
        headers:{
          'content-type':"multipart/form-data"
        }
      }).then(res => {

          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title:"You have succesfully enroled in this course",
              icon:"success",
              toast:true,
              timer:5000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            })
            setEnrollStatus("success")
          } 
      })
    }catch(error) {
      console.log(error);
    }
  }
  // Mark As favorite Course
  const markAsFavorite = ()=> {
    const _formData = new FormData()
    _formData.append("course" , course_id)
    _formData.append("student", studentId)
    _formData.append("status", true)

    try {
      axios.post(baseUrl + '/student-add-favorite-course/' , _formData , {
        headers:{
          'content-type':"multipart/form-data"
        }
      }).then(res => {

          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title:"You have succesfully choise favorite course",
              icon:"success",
              toast:true,
              timer:7000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton:false
            })
            setFavoriteStatus("success")
          } 
      })
    }catch(error) {
      console.log(error);
    }  
  }
  // End

  // Remove Favorite
  const removeFavorite = ()=> {
    try {
      axios.get(baseUrl + "/student-remove-favorite-course/" + studentId + "/" + course_id)
      .then(res =>{
        if (res.data.bool === true) {
          Swal.fire({
            title:"You have succesfully delete favorite course",
            icon:"success",
            toast:true,
            timer:7000,
            position:'top-right',
            timerProgressBar:true,
            showConfirmButton:false
          })
          setFavoriteStatus ("")
          // console.log("wee");
        }else {
          setFavoriteStatus('success')
        }
      })
    }catch(error) {
      console.log(error);
    }
  }
  //End
  // Add Raiting
  const [ratingData, setRatingData] = useState({
      rating:"",
      reviews:""
  })

    
  const handleChange = e => {
    console.log(e.target.value);
    console.log(e.target.name);
    setRatingData({
      ...ratingData,
      [e.target.name]:e.target.value
    })
  }

  
  const formSubmit = (e) => {
    const _formData = new FormData()
    _formData.append("course" , course_id)
    _formData.append("student", studentId)
    _formData.append("rating", ratingData.rating)
    _formData.append("reviews", ratingData.reviews)

    axios.post(baseUrl+"/course-rating/" +course_id , _formData)
    .then(res => {
      Swal.fire({
        title:"You have succesfully enroled in this course",
        icon:"success",
        toast:true,
        timer:5000,
        position:'top-right',
        timerProgressBar:true,
        showConfirmButton:false
      })
      window.location.reload()
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    
    <Container className="m-5">
      <Row>
        <Col className="col-4">
          <img src={courseData.featured_img} alt={courseData.title} className='img-thumbnail img-fluid'/>
        </Col>
        <Col className="col-8">
          <h3> { courseData.title } </h3>
          <p> { courseData.description }</p>
          <p className="fw-bold">Course by<Link to={`/teacher-detail/${teacherData.id}`}> { teacherData.full_name } </Link></p>
          <p className='fw-bold'>Techs:&nbsp;
          {techList.map((tech, index)=>
            <Link to={`/category/${tech.trim()}`} className="badge bg-warning ms-1">{tech}</Link>  
          )}
          </p>
          <p className='fw-bold'>Duration 3 Hours 30min</p>
          <p className='fw-bold'>Total enrolled: {courseData.total_enrolled_students } Students</p>

          <p className="fw-bold">
          Rating {avgRating}/5
          <p>Views {courseView}</p>
            {
              enrollStatus === "success" && userLoginStatus === "success" &&
              <Fragment>
              {
                ratingStatus !== "success" &&
                <button className='btn btn-success btn-sm ms-3' data-bs-toggle="modal" data-bs-target="#ratingModal">Raiting</button>
              }
              {
                ratingStatus === "success" &&
                <small className="badge bg-info text-white ms-2">You already rated this course</small>
              }
                <div className="modal fade" id='ratingModal' tabindex="-1" aria-labelledby='exempleModalLabel' aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Rate for {courseData.title}</h5>
                        <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="raiting">Rating</label>
                            <select id="rating" name='rating' onChange={handleChange} rows="10" className="form-control">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="review" className="form-label">Review</label>
                            <textarea onChange={handleChange} name="reviews" className="form-control"></textarea>
                          </div>
                          <input type="button" value="Submit" onClick={formSubmit} className='btn btn-primary'/>
                        </form>
                      </div>
                      {/*<div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>*/}
                    </div>
                  </div>
                </div>

              </Fragment>
            }
          </p>
          <p>
            {
              userLoginStatus === "success" && enrollStatus !== "success" &&
              <button onClick={enrollCourse} className='btn btn-success'>Enroll in this course</button>
            }
            {           
              userLoginStatus === "success" && favoriteStatus !=="success" &&
              <p><button onClick={markAsFavorite} title="Add in your favorite Course list" className='btn btn-outline-danger mt-2'><i className="bi bi-heart-fill" aria-hidden="true"></i> </button></p>
            }
            {
              userLoginStatus === "success" && favoriteStatus ==="success" &&
              <p><button onClick={removeFavorite} title="Add in your favorite Course list" className='btn btn-danger mt-2'><i className="bi bi-heart-fill" aria-hidden="true"></i> </button></p>
            }
            {
              userLoginStatus !== "success" &&
              <Link to="/user-login" className='btn btn-success'>Please login to enroll</Link>
            }
            {
              enrollStatus === "success" && userLoginStatus === "success" &&
              <span>You are already success in this course</span>
            }
          </p>
          
        </Col>
      </Row>
      {/* Courses video*/}
        <Card className="mt-3" >
          <Card.Header className="h2">In this courses</Card.Header>
          <ListGroup >
          {chapterData.map((chapter , index) =>
            <ListGroup.Item>
                  {chapter.title} 
                <span className="float-end">
                  <span className="me-3">1:30 mins</span>
                  <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className='bi bi-youtube'></i></button>
                </span>
                {/* Modal */}
                <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{chapter.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="ratio ratio-16x9">
                            <video controls width="100%" className='mt-2'>
                              <source src={chapterData.video} title={chapter.video} type="video/mp4"/>
                          </video> 
                        </div>
                      </div>
         
                    </div>
                  </div>
                </div>

              {/* End Modal */}
            </ListGroup.Item>
            )}
          </ListGroup>
      </Card>
      <h3 className='mt-5 text-start'>Related courses</h3>
      <Row>
      {relatedCourseData.map((rcourse , index) =>
        <Col md={3} sm={6}>
          <Card className='mt-3'>
            <Card.Img variant="top" src={`${siteUrl}media/${rcourse.fields.featured_img}`} alt={rcourse.fields.title} className="img-fluid"/>
            <Card.Body>
              <Card.Title><Link target="__blank" to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )} 
      </Row>
    </Container>
  )
}

export default  CourseDeatails;