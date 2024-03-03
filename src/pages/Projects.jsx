import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Row, Col } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { getAllProjectApi } from '../services/allAPI';

function Projects() {
  const [projectsExplore, setProjectExplore] = useState([]);
  const [searchKey,setSearchKey] = useState("")
  const fetchingAll = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader=
        {"Authorization":`Bearer ${token}`}
        const result = await getAllProjectApi(searchKey,reqHeader);
        if (result.status === 200) {
          setProjectExplore(result.data);
        } else {
          console.log(result.response.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingAll();
  }, [searchKey]);

  return (
    <div className='conainer-fluid'>
      <Header></Header>

      <div className='text-center mt-5 d-flex justify-content-around align-items-center'>
        <span className=' fw-medium' style={{ fontSize: '50px' }}>
          <i> All Projects</i>
        </span>
        <input
          className='form-control  rounded'
          style={{ width: '300px', height: '35px' }}
          type='text'
          onChange={e=>setSearchKey(e.target.value)}
          placeholder='Search projects by Languages used'
        />
      </div>
      <Row>
        {projectsExplore.length > 0 ? (
          projectsExplore.map((project, index) => (
            <Col key={index} sm={12} md={6} lg={6} className='p-5'>
              <ProjectCard project={project} />
            </Col>
          ))
        ) : (
          <div>Nothing to display</div>
        )}
      </Row>
    </div>
  );
}

export default Projects;
