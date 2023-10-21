import React, { useState, Fragment } from 'react'
import { Container ,  Navbar , Nav, NavDropdown, Form, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Header = () => {

  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  const studentLoginStatus = localStorage.getItem("studentLoginStatus")

  const [searchString, setSearchString] = useState({search:''});

  const handleChange = (e)=> {
    setSearchString({
      ...searchString,
      [e.target.name]:e.target.value
    })
  }
  const searchCourse = ()=> {
    if (searchString.search !== "" && searchString.search.trim() !=="") {
      window.location.href="/search/"+searchString.search
      setSearchString({search:''})
    }
    
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="nav_value text-decoration-none">Soleil Shop de la technologie</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by course or technology"
              className="me-2"
              aria-label="Search"
              name="search"
              onChange={handleChange}
            />
            <Button onClick={searchCourse} variant="outline-warning">Search</Button>
          </Form>
          <Nav navbarScroll className="ms-auto me-5">
            <Link className='nav-link' to="/"><span className='nav_value'>Home</span></Link>
            <Link className='nav-link' to="/category"><span className='nav_value'>Categories</span></Link>
            <Link className='nav-link' to="/all-courses"><span className='nav_value'>Course</span></Link>
            <NavDropdown className="nav_title text-decoration-none text-white" title="Teacher" id="nav-dropdown">
            {
              teacherLoginStatus !=="true"?(
              <Fragment>
                  <NavDropdown.Item eventKey="4.1"><Link className='nav-link text-black' to="/teacher/login">Login</Link></NavDropdown.Item>
            
                  <NavDropdown.Item eventKey="4.2"><Link className='nav-link text-black' to="/teacher/register">Register</Link></NavDropdown.Item>
              </Fragment>
              ):(
              <Fragment>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.3"><Link className="nav-link text-black" to="/teacher/dashboard">Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4"><Link className='nav-link text-black' to="/teacher/logout">Logout</Link></NavDropdown.Item>
              </Fragment>
              )
              
            }               
            </NavDropdown>
            <NavDropdown title="User" className="nav_title" id="nav-dropdown">
              {
                studentLoginStatus !== "true"?(
                  <Fragment>
                    <NavDropdown.Item eventKey="4.1"><Link className='nav-link text-black' to="/user-login">Login</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2"><Link className='nav-link text-black' to="/user-register">Register</Link></NavDropdown.Item>
                  </Fragment>
                ):
                (
                  <Fragment>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.3"><Link className="nav-link text-black" to="/user-dashboard">Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.4"><Link className='nav-link text-black' to="/user-logout">Logout</Link></NavDropdown.Item>
                  </Fragment>
                )
              }
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default Header