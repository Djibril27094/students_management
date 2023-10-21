import React, {useState,
   useEffect} from 'react';
import { Container , Row , Col , Card , ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api'

function TeacherDetail() {

  const [teacherData, setTeacherData] = useState([])
  const [skillList, setSkillList] = useState([])
  const [courseData, setCourseData] = useState([])
  const { teacher_id } = useParams()

  useEffect(() =>{
    try {
      axios.get(baseUrl + "/teacher/" + teacher_id)
      .then(res => {
        setTeacherData(res.data)
        setCourseData(res.data.teacher_courses)
        setSkillList(res.data.skill_list)
        // setChapterData(res.data.course_chapters)
        // setRelatedCourseData(JSON.parse(res.data.related_videos))
      })
    }catch(error) {
      console.log(error);
    }
  },[teacher_id])

  const icon_style={
    'font-size':'30px'
  }

  return (
    <Container className="m-5">
      <Row>
        <Col className="col-4">
          <img src={teacherData.profile_img} alt="Teacher "  className='img-thumbnail img-fluid'/>
        </Col>
        <Col className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.detail}</p>
          <p className="fw-bold">Skills: &nbsp; 
          {skillList.map((skill, index)=>
            <Link to={`/teacher-skill-couses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ms-1">{skill.trim()}</Link>  
          )}
          </p>
          <p className='fw-bold'>Recent Course <Link to="/category/php">ReactJs Course</Link> </p>
          <p>
          {
            teacherData.facebook_url &&
            <a href={teacherData.facebook_url} style={icon_style} className='me-2'><i className="bi bi-facebook"></i></a>
          }
          {
            teacherData.twitter_url && 
            <a href={teacherData.twitter_url} style={icon_style} className='me-2'><i className="bi bi-twitter"></i></a>
          }
          {
            teacherData.instagram_url &&
            <a href={teacherData.instagram_url} style={icon_style} className='me-2'><i className="bi bi-instagram"></i></a>
          }
          {
            teacherData.website_url &&
            <a href={teacherData.website_url} style={icon_style} className='me-2'><i className="bi bi-globe"></i></a>
          }</p>

        </Col>
      </Row>
      {/* Courses video*/}
        <Card className="mt-3" >
          <Card.Header className="h2">Course List</Card.Header>
          <ListGroup >
          {courseData.map((course , index) =>
            <ListGroup.Item>
              <Link to={`/detail/${course.id}`}>{course.title}</Link>
            </ListGroup.Item>
          )}
          </ListGroup>
      </Card>
    </Container>
  )
}

export default TeacherDetail