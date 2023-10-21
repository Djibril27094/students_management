import React, { useState, useEffect } from 'react';

import { Container , Row , Col, Card } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function TeacherSkillCourse() {

    const [courseData, setCourseData] = useState([])
    const {skill_name,teacher_id} = useParams()
    useEffect(() =>{
        try {
          axios.get(baseUrl + "/course/?skill_name="+skill_name+"&teacher="+teacher_id )
          .then(res => {
             setCourseData(res.data)
          })
        }catch(error) {
          console.log(error);
        }
      })
      console.log(courseData);
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>Category {skill_name}</h3>
            <Row className="mb-3">
            {courseData && courseData.map((course , index) => 
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                    <Link to={`/detail/${course.id}`}> <Card.Img variant="top" src={ course.featured_img } /></Link>
                    <Card.Body>
                        <Card.Title><Link to={`/detail/${course.id}`}>{course.title}</Link></Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                )}
            </Row>

            

            <nav aria-label="Page navigation example">
                <ul className="pagination mt-5 justify-content-center">
                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </nav>
        </Container>
    )
}

export default TeacherSkillCourse