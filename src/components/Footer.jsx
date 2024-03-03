import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
    <div className='bg-danger ps-4 pt-5'>
    <Row className='pb-5'>
      <Col className='pt-2 ps-4' lg={3} md={3} sm={3}>
        <h3 className='fw-bolder fs-1' style={{overflowY:'hidden'}} > <i> PROJECT HUB </i> </h3>
        <p className='text-light mt-3' style={{ fontSize: '10px' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </Col>

      <Col lg={3} md={3} sm={3}>
        <span className='text-white pt-2 fs-5'>Links</span>
        <div className='mt-3 '>
          <Link to={'/'} className='' style={{ textDecoration: 'none', color:'whitesmoke' }} href="">
            Home
          </Link>
          <br />
          <Link to={'/login'} className='' style={{ textDecoration: 'none',color:'whitesmoke' }} href="">
            Login
          </Link>
          <br />
          <Link to={'/register'} className='' style={{ textDecoration: 'none',color:'whitesmoke' }} href="">
            Register
          </Link>
        </div>
      </Col>

      <Col lg={3} md={3} sm={3}>
        <span className='text-white pt-2 fs-5'>Guides</span>
        <div className='mt-3 '>
          <a className='text-white' style={{ textDecoration: 'none' }} href="">
            React
          </a>
          <br />
          <a className='text-white' style={{ textDecoration: 'none' }} href="">
            React Bootstrap
          </a>
          <br />
          <a className='text-white' style={{ textDecoration: 'none' }} href="">
            Routing
          </a>
        </div>
      </Col>

      <Col lg={3} md={3} sm={3}>
        <span className=' fs-4' style={{color:'whitesmoke'}}>
          <b>Contact Us</b>
        </span>
        <br />
        <input type='text' style={{border:'none'}} className='w-75 mt-2 rounded ' placeholder='enter email' />
        <br />
        <button className=' bg-secondary shadow-lg w-50 mt-2 btn' style={{color:'whitesmoke',textDecoration:'none'}}>
          Send
        </button>
        <br />
      
      </Col>
    </Row>


  </div>
    </div>
  )
}

export default Footer
