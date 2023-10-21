import { useEffect, useState } from "react"
import axios from "axios"

import { Container , Row , Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Teacher from "../assets/teacher.jpg"


const baseUrl = "http://127.0.0.1:8000/api"

function PopularTeachers() {

    const [teacher, setTeacher] = useState(null)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/teacher/").then((res) => {
        setTeacher(res.data)
      })
   
    },[])
    
    console.log(teacher);

    return(
        <Container className="mt-4">
            <h3 className='pb-1 mb-1 text-start'>Popular Teacher</h3>
            <Row className="mb-3">
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                    <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><Link to='/detail/1'>Course title</Link></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                    <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><Link to='/detail/1'>Course title</Link></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6}>
                    <Card className='mt-3'>
                        <Card.Img variant="top" src={ Teacher } />
                        <Card.Body>
                            <Card.Title><a href='#'>Course title</a></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <div className="title">
                                <span>Raiting 4.5/5</span> 
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
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

export default PopularTeachers