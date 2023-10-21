import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Card ,  Container, Row, Col } from "react-bootstrap"

import axios from 'axios';

const baseUrl = 'http://localhost:8000/api'

const Home = () => {

  const [ courseData , setCourseData ] = useState([])
  const [popularCourses, setPopularCourses] = useState([]);
  const [popularTeacher, setPopularTeacher] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  
    useEffect(() => {
      axios.get(`${baseUrl}/course/?result=4`)
        .then(res => {
            setCourseData(res.data.results)
        }).catch(err => {
            console.log(err)
        }) 
      axios.get(`${baseUrl}/popular-courses/?popular=1`) 
        .then(res => {
          setPopularCourses(res.data)
        }).catch(err => {
            console.log(err)
        })
      axios.get(`${baseUrl}/popular-teachers/?popular=1`) 
      .then(res => {
        setPopularTeacher(res.data)
      }).catch(err => {
          console.log(err)
      })

      axios.get(`${baseUrl}/student-testimonial/`) 
      .then(res => {
        console.log(res.data)
        setTestimonialData(res.data)
      }).catch(err => {
          console.log(err)
      })
    }, [])
  return (
    <Container className="mt-5">
      <h3 className='pb-1 mb-1 text-start'>Latest Courses <Link to="/all-courses" className='btn btn-primary float-end'>Se All</Link></h3>
      <Row>
      {courseData && courseData.map((course , index)  => 
        <Col md={3} sm={6}>
          <Card className='mt-3'>
            <Card.Img variant="top" src={ course.featured_img } />
            <Card.Body>
              <Card.Title><Link to={`/detail/${course.id}`}>{ course.title }</Link></Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )}
      </Row>
      <h3 className='pb-1 mb-1 text-start'>Populars Courses <Link to="/popular-courses" className='btn btn-primary float-end'>See All</Link></h3>
      <Row>
        {popularCourses && popularCourses.map((pCourse , index)=>
          <Col md={3} sm={6}>
            <Card className='mt-3'>
              <Card.Img variant="top" src={ pCourse.course.featured_img } />
              <Card.Body>
                <Card.Title><Link to={`/detail/${pCourse.course.id}`}>{pCourse.course.title}</Link></Card.Title>
              </Card.Body>
              <Card.Footer>
                <div className="title">
                  <span>{pCourse.rating}/5</span>
                  <span className="float-end">View {pCourse.course.course_views}</span> 
                </div>
              </Card.Footer>
            </Card>
          </Col>
        )}
        
      </Row>
      <h3 className='pb-1 mb-1 text-start'>Features teachers <Link to="/popular-teachers" className='btn btn-primary float-end'>See All</Link></h3>
      <Row> 
          {popularTeacher.map((pTeacher , index) =>
            <Col md={3} sm={6}>
              <Card className='mt-3'>
                <Card.Img variant="top" src={ pTeacher.profile_img } />
                <Card.Body>
                  <Card.Title><Link to={`/teacher-detail/${pTeacher.id}`}>{ pTeacher.full_name}</Link></Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Card.Title>Total courses:{ pTeacher.total_teacher_courses}</Card.Title>
                </Card.Footer>
              </Card>
            </Col>
          )}
      </Row>
      <h3 className='pb-1 mb-5 '>Students Testimonial</h3>
      
      <div id="carouselExampleIndicators" className="carousel slide py-5 bg-dark text-white" data-bs-ride="true">
        <div className="carousel-indicators">
          {testimonialData && testimonialData.map((row , index) =>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active":""} ></button>
          )}          
        </div>
        <div className="carousel-inner">
          {
            testimonialData && testimonialData.map((row , i) =>
            <div className={i === 0 ? "carousel-item text-center active":"carousel-item text-center"}>
              <blockquote className='blockquote'>
                <p>{row.reviews}</p>
                <figcaption className='footer-footer'>
                  {row.course.title} <cite title="Source title">{row.student.full_name}</cite>
                </figcaption>
              </blockquote>
            </div>
            )
          }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
    </div>
  </Container>
  )
}

export default Home