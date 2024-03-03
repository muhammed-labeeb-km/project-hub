import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dash() {
  const [userName,setUserName] = useState('') 
  
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUserName(sessionStorage.getItem("username"))
    }
    else{
      setUserName('User')
    }



  },[])
  return (
    <div>
      <Header insideDash ></Header>
      <div className='container-fluid'>
      <h1 className='fw-bolder' >
        Welcome <span className='text-warning' >{userName}</span>
      </h1>
      <Row>
      <Col md={8} lg={8} className='p-5' >
        <MyProjects/>
      </Col>
      <Col md={4} lg={4} className='p-5' >
        <Profile/>
      </Col>
      </Row>
      </div>
    </div>
  )
}

export default Dash
