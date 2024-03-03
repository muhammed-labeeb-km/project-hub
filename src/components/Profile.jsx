import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import profile from '../assets/profile.png'
import Collapse from 'react-bootstrap/Collapse';
import { updateUserProfileApi } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';
function Profile() {

  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedIn:"",profileImages:null
  })

  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
      const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
      setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedIn:userDetails.linkedIn})
      setExistingImage(userDetails.profile)
    }
  },[open])

// console.log(userData);

  useEffect(()=>{
    if(userData.profileImages){
      setPreview(URL.createObjectURL(userData.profileImages))
    }else{
      setPreview("")
    }
  },[userData.profileImages])

  const handleProfileUpdate = async(e) =>{
    e.preventDefault()
    const {username,password,email,github,linkedIn,profileImages} = userData
    if(!github || !linkedIn){
      alert("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedIn",linkedIn)
      
      preview ? reqBody.append("profileImages", profileImages) : reqBody.append("profileImages", existingImage);


      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization": `Bearer ${token}`,
        }  
        //api call 

        try{
          const result = await updateUserProfileApi(reqBody,reqHeader)
          if(result.status == 200){
            setOpen(!open)
            console.log(result.data);
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }else{
            console.log(result)
          }
        }catch(err){
          console.log(err);
        }

      }
    }
  }

  return (
    <div className='border rounded p-2' >
      <div className='d-flex justify-content-around align-items-center' >
      <h3>Profile</h3>
      <button  onClick={() => setOpen(!open)} aria-controls="example-collapse-text"  aria-expanded={open} className='btn btn-outline-warning' ><i className='fa-solid fs-2 fa-caret-down' ></i></button>
      </div>

      <Collapse in={open}>
      <div className='text-center p-1' id="example-collapse-text"  >
      
      <form>
      <label>
        <input type="file" style={{display:'none'}} onChange={e=>setUserData({...userData,
        profileImages:e.target.files[0]})}  />
        { existingImage==""? 
        <img className='img-fluid ' src={preview?preview:profile} width={'80px'} alt="upload profile" />: 
        <img className='img-fluid ' src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} width={'80px'} alt="upload profile" />
      }
      </label>

      <div><input type="text" className='form-control my-1 p-1 rounded' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}  placeholder='Enter your GitHub Link here' /></div>
      <div><input type="text" className='form-control my-1 p-1 rounded'  value={userData.linkedIn} onChange={e=>setUserData({...userData,linkedIn:e.target.value})} placeholder='Enter your Linkedin Link here' /></div>      
      
      <div><button onClick={e=>{handleProfileUpdate(e)}} className='btn-warning w-50 btn text-white fw-bolder my-1' >UPDATE</button></div>
      
      </form>
      </div>
    </Collapse>

    </div>
  )
}

export default Profile
