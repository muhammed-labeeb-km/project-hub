import React, { useContext, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import loginGif from '../assets/loginGif.gif'
import Form from 'react-bootstrap/Form';
import { registerAPI } from '../services/allAPI';
import { loginAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../Context/TokenAuth';

function Auth({insideRegister}) {

  const navigate = useNavigate()
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const [userInputData,setUserInputData] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password} = userInputData
    if(!email || !password ){
    alert('fill the form completely.........')
   }
   else{
    try{
      const result = await loginAPI({email,password})
      console.log(result);

      if(result.status == 200){

        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))

        setIsAuthorised(true)
        setUserInputData({
          email:"",
          password:""
        })

        navigate('/')

      }
      else{
        alert(result.response.data)
      }
    }catch(err){
      console.log(err);
    }
    
  }
  }


const handleRegister = async (e) =>{
  e.preventDefault()
  console.log(userInputData);
  const {username,email,password} = userInputData
  if(!username || !email || !password ){
    alert('fill the form completely.........')
  }
  else{
    try{
      const result = await registerAPI(userInputData)
      console.log(result);
      if(result.status == 200){
        alert(`${result.data.username} registered successfully `)
        setUserInputData({
          username:"",
          email:"",
          password:""
        })
         
          navigate('/login')
      }
      else{
        alert(result.response.data)
      }
    }catch(err){
      console.log(err);
    }
    
  }
}


  return (
    <div className='w-100 d-flex justify-content-center align-items-center p-5 ' style={{height:'100vh'}} >
      <div className="container w-75">
        <Link to='/'  style={{textDecoration:'none'}} >
        BAck to Home
        </Link>
        <div className="card shadow p-5 " style={{backgroundColor:"#01a1fe"}} >
        <Row className='align-items-center' >
        <Col lg={6} md={6} >
          <img className='rounded' src={loginGif} width={'90%'} alt="Authentication" />
        </Col>
        <Col lg={6} md={6} >
          <h1 className="fw-bolder text-light mt-2">
           Projet Fair
          </h1>
          {
            insideRegister?<h5 className='fw-bolder text-light mt-2'>
            Sing In to your Account
            </h5>:
            <h5 className='fw-bolder text-light' >Sign Up to your Account</h5>
          }

          <Form className='text-light' >

          {
            insideRegister && 
            
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control value={userInputData.username} onChange={e=>setUserInputData({...userInputData,username:e.target.value})} className='text-secondary' style={{backgroundColor:'#e2ffff'}} type="email" placeholder="Enter Name" />
            </Form.Group>
          }

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control value={userInputData.email} onChange={e=>setUserInputData({...userInputData,email:e.target.value})}  className='text-secondary' style={{backgroundColor:'#e2ffff'}} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control value={userInputData.password} onChange={e=>setUserInputData({...userInputData,password:e.target.value})}  className='text-secondary' style={{backgroundColor:'#e2ffff'}} type="password" placeholder="Enter Password" />
            </Form.Group>

          {
            insideRegister?
            <div className='text-center mt-5'>
            <button onClick={(e)=>handleRegister(e)} style={{backgroundColor:'#52b7f2'}} className=' btn w-50 mb-2' >Register</button>
            <p>Already have Account? Click here to <Link to={'/login'} >Login</Link> </p>
            </div>
            :
            <div className='text-center mt-5'>
            <button onClick={handleLogin} style={{backgroundColor:'#52b7f2'}} className=' btn w-50 mb-2' >Login</button>
            <p>New User? Click here to <Link to={'/register'} >Register</Link> </p>
            </div>
          }
          </Form>
        </Col>
        </Row>
        </div>
      </div>
    </div>
  )
}

export default Auth
