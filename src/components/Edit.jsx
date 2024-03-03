import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import profile from '../assets/profile.png'
import SERVER_URL from '../services/serverUrl';
import { updateProject } from '../services/allAPI';
import { updateResponseContext } from '../Context/ContextShare';
function Edit({projects}) {
  
  const {editResponse,setEditResponse} =  useContext(updateResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => {    
    setShow(false)
    setProjectData({title:projects.title,languages:projects.languages,github:projects.github,website:projects.website,projectImage:"",overview:projects.overview,id:projects._id})
    setPreview("")
  };
  const handleShow = () => setShow(true);
  const [preview,setPreview] = useState("")
  const [projectData,setProjectData] = useState({
    title:projects.title,languages:projects.languages,github:projects.github,website:projects.website,projectImage:"",overview:projects.overview,id:projects._id
  })
  
  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      setPreview("")
    }
  },[projectData.projectImage ])

  const handleUpdate = async () => {
    const {id,title,languages,overview,github,website,projectImage} = projectData

    if(!title || ! languages || !overview || !github || !website){

      alert('plrease fill the form completely')

    }else{
     
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      
      preview ? reqBody.append("profileImages", projectImage) : reqBody.append("profileImages", projects.projectImage);

      const token  = sessionStorage.getItem('token')
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`,
        }

        // console.log("Proceed to api call");
        try{
          const result = await updateProject(id,reqBody,reqHeader)
          if(result.status == 200){
            handleClose()
            //share response to myproject component

            setEditResponse(result.data)

          }else{
            console.log();
          }
        }catch(err){

        }

      }

    }

  }

  return (
    <div>
    <button onClick={handleShow} className='btn text-primary' ><i className='fa-solid fa-edit' ></i></button>


    <Modal show={show} centered keyboard={false} backdrop="static" onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Project Details</Modal.Title>
    </Modal.Header>
    
    <Modal.Body>
    <Row>
      <Col md={4} sm={4} lg={4} className='p-3' >
        <label className='p-1'>
          <input type="file" onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} style={{display:'none'}} />
          <img className='img-fluid' width={'100%'} src={preview?preview:`${SERVER_URL}/uploads/${projects.projectImage}`} alt="" />
        </label>
      </Col>
      <Col  className='' md={8} sm={8} lg={8}>
        <div className='my-1'>
          <input type="text" value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} placeholder='Project Title' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text"  value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} placeholder='Language Used' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text"  value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} placeholder='GitHub Link' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text"  value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} placeholder='Project Website Link  ' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text"  value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} placeholder='Project Overview' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
      </Col>
    </Row>
    </Modal.Body>
    
    
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        cancel
      </Button>
      <Button variant="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default Edit
