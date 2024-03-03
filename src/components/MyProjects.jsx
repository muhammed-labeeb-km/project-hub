import React, { useEffect,useState } from 'react'
import Add from './Add'
import { useContext } from 'react'
import Edit from './Edit'
import { deleteProject, getUserProjectApi } from '../services/allAPI'
import { addResponseContext, updateResponseContext } from '../Context/ContextShare'
function MyProjects() {
  const {editResponse,setEditResponse} = useContext(updateResponseContext)
  const{addResponse,setAddResponse} = useContext(addResponseContext)
  const [userProjects,setUserProjects] = useState([])


  const gettingUserProjects = async() =>{
    try{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          "Authorization":`Bearer ${token}`
        }
        const result = await getUserProjectApi(reqHeader)
        if(result.status==200){
          setUserProjects(result.data)
        }
        else{
          console.log(result.response.data);
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleProjectDelete = async(projectId) => {
    // console.log(projectId);
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      }  
    try{
      // console.log(projectId);
      const result = await deleteProject(projectId,reqHeader)
      if(result.status == 200){
        gettingUserProjects()
      }
      else{
        console.log(result.response);
      }
    }catch(err){
      console.log(err);
    }
  }
}

  useEffect(()=>{
    gettingUserProjects()
  },[addResponse,editResponse])

  return (
    <div className='border rounded p-3' > 
      <div className='d-flex justify-content-between' >
      <h3>Project</h3> 
      <Add/>
      </div>
      <div className='my-2' >
        { userProjects.length>0? userProjects.map((projects,index)=>(<div key={index} className='border my-2 rounded d-flex align-items-center p-1 justify-content-between'>
        <h4>{projects.title}</h4>
          <div className='icons d-flex align-items-center '>
            <Edit projects={projects} />
            <a href={projects.github} target='_blank' className='btn' > <i className='fa-brands fa-github' ></i>  </a>
            <button onClick={()=>{handleProjectDelete(projects._id)}}  className='btn' > <i className='fa-solid text-danger fa-trash' ></i> </button>
          </div>
        </div>)):
      <div>Please add some projects</div>}
      </div>
    </div>
  )
}

export default MyProjects