import React, { useState, useEffect } from 'react';
import { Container , Row , Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api'

function PopularCourses() {
    const [popularCourses, setPopularCourses] = useState([]);

    useEffect(() => {
      axios.get(`${baseUrl}/popular-courses/?all=1`) 
        .then(res => {
          setPopularCourses(res.data)
          console.log(res.data);
        }).catch(err => {
            console.log(err)
        }) 
    }, [])
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>Popular Courses</h3>
            
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

            <nav aria-label="Page navigation example">
                <ul className="pagination mt-5 justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </Container>
    )
}

export default PopularCourses