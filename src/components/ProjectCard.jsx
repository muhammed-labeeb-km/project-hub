import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import maxresdefaul from '../assets/maxresdefault.jpg'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverUrl';

function ProjectCard({project}) {
  // console.log(allProjects);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
        <Card  onClick={handleShow} className='shadow ' style={{ width: '',border:'none',backgroundColor:'whitesmoke' }}>
        <Card.Img  variant="top" src={`${SERVER_URL}/uploads/${project.projectImage}`} height={'200px'}/>
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card> 

     

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
        <Col sm={12} md={6} lg={6} >
        <img src={`${SERVER_URL}/uploads/${project.projectImage}`} className='img-fluid' width={'100%'} alt="project image" />
        </Col>
        <Col sm={12} md={6} lg={6} >
        <h2 className="fw-bolder text-center my-4 text-secondary">
        {project.title}
        </h2>
        <p>Project overview : <span className='text-secondary'> {project.overview}</span></p>
        <p>Languages used : <span className='text-warning' > {project.languages}</span></p>
        </Col>
        </Row>
        <div>
        <a href={project.github} target='_blank' style={{cursor:'pointer'}} ><i className='fa-brands text-secondary fa-2x fa-github' ></i></a>
        <a href={project.website} target='_blank' style={{cursor:'pointer'}} ><i className='fa-solid text-secondary fa-2x fa-link' ></i></a>
        </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default ProjectCard
