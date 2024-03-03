import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import profile from '../assets/profile.png'
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../Context/ContextShare';
function Add() {

  const{addResponse,setAddResponse} = useContext(addResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    
        setProjectData({
            title: "",
            languages: "",
            github: "",
            website: "",
            projectImage: "",
            overview: ""
        });
        setShow(false);
    
};

  const handleShow = () => setShow(true);


  const [imageFileStatus,setImageFileStatus] = useState(false)
  const [preview,setPreview] = useState('')
  
  const [projectData,setProjectData] = useState({
    title:"",languages:"",github:"",website:"",projectImage:"",overview:""
  })
  
  useEffect(()=>{
    if(projectData.projectImage?.type == 'image/png' || projectData.projectImage?.type == 'image/jpg' || projectData.projectImage?.type == 'image/jpeg'){
      
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectImage))
      
    }else{
      setPreview("")
      setProjectData({...projectData,projectImage:""})
      setImageFileStatus(false)
    }

  },[projectData.projectImage])
  
  // console.log(preview);
  // console.log(projectData);
  

  const handleSave = async ( ) =>{
    const {title,languages,overview,github,website,projectImage} = projectData
    if(!title || !languages || !github || !website || !projectImage || !overview ){
      alert('fill the form')
    }
    else{

      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")

      console.log("Token:", token);
      
      if(token){

        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`,
        }
        
        console.log("ready for api call");
        console.log(reqHeader);
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          if(result.status === 200){
            // console.log(result.data);
            setAddResponse(result.data)
            handleClose()
          }
          else{
            alert(result.response.data)
          }
        }catch(err){
          console.log(err);
        }
      }

      

     
    
    }
  }


  return (
    <div>
    <Button style={{textDecoration:'none'}} className='btn btn-link btn-outline-warning text-secondary border' onClick={handleShow}>
    <i className='fa-solid fa-plus'> Add </i>
  </Button>

  <Modal show={show} centered keyboard={false} backdrop="static" onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Project Details</Modal.Title>
    </Modal.Header> 
    
    <Modal.Body>
    <Row>
      <Col md={4} sm={4} lg={4} className='p-3' >
        <label className='p-1'>
          <input onChange={e => setProjectData({...projectData,projectImage:e.target.files[0]})} type="file" style={{display:'none'}} />
          {imageFileStatus? <img src={preview} alt="" className='img-fluid' style={{width:'100%'}} /> :<img className='img-fluid' width={'100%'} src={profile} alt="" />}
        </label>
       { !imageFileStatus && <div style={{fontSize:"10px"}} className="text-danger">
        *Upload only the following file type(jpg, jpeg, png)*
        </div>}
      </Col>
      <Col  className='' md={8} sm={8} lg={8}>
        <div className='my-1'>
          <input type="text" value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} placeholder='Project Title' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text" value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} placeholder='Language Used' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text" value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} placeholder='GitHub Link' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text" value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} placeholder='Project Website Link  ' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
        <div className='my-1'>
          <input type="text" value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} placeholder='Project Overview' style={{border:'1px solid'}} className=' rounded p-2 w-100' />
        </div>
      </Col>
    </Row>
    </Modal.Body>
    
    
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save 
      </Button>
    </Modal.Footer>
  </Modal>
    
    </div>
  )
}

export default Add
