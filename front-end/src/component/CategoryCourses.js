import React, { useState, useEffect } from 'react';

import { Container , Row , Col, Card } from "react-bootstrap"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function CategoryCourses() {

    const [courseData, setCourseData] = useState()
    const [previousUrl, setPreviousUrl] = useState();
    const [nextUrl, setNextUrl] = useState();
    const {category_id , category_slug} = useParams()
    useEffect(() =>{
        try {
          axios.get(baseUrl + "/course/?category_id=" + category_id)
          .then(res => {
            setCourseData(res.data.results)
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
          })
        }catch(error) {
          console.log(error);
        }
      },[category_id])

    const paginationHandler = ()=> {
        try {
            axios.get(baseUrl + "/course/?category_id=" + category_id)
            .then(res => {
              setCourseData(res.data.results)
              setNextUrl(res.data.next)
              setPreviousUrl(res.data.previous)
            })
        }catch(error) {
            console.log(error);
        }
    }

    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start text-primary'>{ category_slug }</h3>
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
                {
                    previousUrl && 
                    <li className="page-item"><button onClick={()=>paginationHandler(previousUrl)} className="page-link"><i className="bi bi-arrow-left"></i> Previous</button></li>
                }
                {
                    nextUrl &&
                    <li className="page-item"><button onClick={()=>paginationHandler(nextUrl)} className="page-link">Next <i className="bi bi-arrow-right"></i></button></li>
                }
                </ul>
            </nav>
        </Container>
    )
}

export default CategoryCourses