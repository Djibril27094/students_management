import React, { useState, useEffect } from 'react';
import { Container , Row , Col, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api'

function Search() {
    const [courseData, setCourseData] = useState([])
    const {searchstring} = useParams()
    useEffect(() => {
      axios.get(`${baseUrl}/search-course/${searchstring}`)
        .then(res => {
            setCourseData(res.data)
        }).catch(err => {
            console.log(err)
        })  
    }, [searchstring])
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>Searched for <span className="text-primary"> {searchstring}</span></h3>
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
                    <li className="page-item"><Link to="" className="page-link">Previous</Link></li>
                    <li className="page-item"><Link to="" className="page-link">1</Link></li>
                    <li className="page-item"><Link to="" className="page-link">2</Link></li>
                    <li className="page-item"><Link to="" className="page-link">3</Link></li>
                    <li className="page-item"><Link to="" className="page-link">Next</Link></li>
                </ul>
            </nav>
        </Container>
    )
}

export default Search