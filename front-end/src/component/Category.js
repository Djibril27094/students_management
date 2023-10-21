import React, { useState, useEffect } from 'react';

import { Container , Row , Col, Card } from "react-bootstrap"
import { Link } from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function Category() {

    const [categoryData, setCategoryData] = useState([])
    useEffect(() =>{
        try {
            axios.get(baseUrl + "/category/")
            .then(res => {
                setCategoryData(res.data)
            })
        }catch(error) {
            console.log(error);
        }
    },[])
    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>All Category</h3>
            <Row className="mb-3">
            {categoryData && categoryData.map((category , index) => 
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Card.Title><Link to={`/category/${category.id}/${category.title}`}>{category.title} ({category.total_courses}) </Link></Card.Title>
                            <Card.Text>{category.description}</Card.Text>
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

export default Category