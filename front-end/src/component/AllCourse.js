import React, { useState, useEffect } from 'react';
import { Container , Row , Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/course'

function AllCourse() {
    const [courseData, setCourseData] = useState([])
    const [nextUrl, setNextUrl] = useState();
    const [previousUrl, setPreviousUrl] = useState();
    
    useEffect(() => {
      axios.get(baseUrl)
        .then(res => {
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
            setCourseData(res.data.results)
        }).catch(err => {
            console.log(err)
        })  
    })
    
    const paginationHandler=(url)=> {
        axios.get(url)
        .then(res => {
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
            setCourseData(res.data.results)
            setCourseData(res.data.results)
        }).catch(err => {
            console.log(err)
        }) 
    }
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start text-primary'>Latest Courses</h3>
            <Row className="mb-3">
                {courseData && courseData.map((course , index) => 
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                    <Link to={`/detail/${course.id}`}> <Card.Img variant="top" src={ course.featured_img } /></Link>
                    <Card.Body >
                        <Card.Title className="lien-cours"><Link to={`/detail/${course.id}`}>{course.title}</Link></Card.Title>
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

export default AllCourse