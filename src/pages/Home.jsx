import React from 'react'
import { Row,Col } from 'react-bootstrap'
import loader from '../assets/loader.gif'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import './Home.css'
import { getHomeProjectApi } from '../services/allAPI'
function Home() {

  const [bulbColor, setBulbColor] = useState('black');
  const [loginStatus,setLoginStatus] = useState(false)


  const [allProjects,setAllProjects] = useState([])

  const getHomeProject = async () =>{
    try{
      const result = await getHomeProjectApi()
    if(result.status === 200 ){
      setAllProjects(result.data)
    }
  }catch(err){
    console.log(err);
  }
  }

// console.log(allProjects);
  
useEffect(() => {

    const intervalId = setInterval(() => {
      
      setBulbColor((prevColor) => (prevColor === 'black' ? 'orange' : 'black'));
    }, 3000);

    return () => clearInterval(intervalId); 
  }, []);

    const navigate = useNavigate()

    const isHeLogged = () => {
      if(loginStatus===true){
        navigate('/projects')
      }
      else{
        alert('Please login to access to projects')
      }
      
    }

    useEffect(()=>{
      getHomeProject()
      if(sessionStorage.getItem("token")){
        setLoginStatus(true)
      }
      else{
        setLoginStatus(false)
      }
    },[])


  return (
    <div style={{minHeight:'100vh'}} >
      <Row className='' style={{backgroundColor:''}} >
      <Col sm={12} md={6} lg={6} className=' text-center' style={{paddingTop:'8%'}} >
           <span className='fw-bolder' style={{fontSize:'50px'}} > <i className="fa-regular fs-1 bulb fa-lightbulb" style={{color: bulbColor,overflowY:'hidden'}} ></i> <i>Project Hub</i></span>
           <br />
           <p className='p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, est inventore quod ipsum enim vel! Deleniti quia illo distinctio saepe quos debitis quibusdam culpa, deserunt mollitia eius iusto minus cupiditate.</p>
           {loginStatus?<Link to='/dash' > <button className='btn btn-warning'> Manage your projects </button> </Link>:<Link to='/login' > <button className='btn btn-warning'> Start to Explore </button> </Link>}
          
      </Col>
      <Col sm={12} md={6} lg={6} >
      <img src={loader} width={'90%'} alt="" />  
      </Col>
      </Row>
      <div className='text-center'>
       <h1> Explore Our Projects </h1>
       <br  />
       <marquee behavior="" direction="">
        <div className="d-flex justify-content-between">
          { allProjects.length &&
            allProjects.map((project,indx)=>(
              <div key={indx} className="project mx-3">
              <ProjectCard project={project} />
          </div>
            )) }
        </div>
       </marquee>
       <div className='text-center'>
       <button onClick={()=>{isHeLogged()}} className='btn btn-link text-warning' > want to view more projects?????</button>
       </div>
      </div>
    </div>
  )
}

export default Home
