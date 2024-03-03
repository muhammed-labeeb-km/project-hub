import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { tokenAuthContext } from '../Context/TokenAuth';

function Header({insideDash}) {
      const [bulbColor, setBulbColor] = useState('black');
      const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
      const navigate = useNavigate()

      const handleLogout = () => {
        sessionStorage.clear()
        setIsAuthorised(false)
        navigate('/')
      }
      useEffect(() => {
        const intervalId = setInterval(() => {
          
          setBulbColor((prevColor) => (prevColor === 'black' ? 'orange' : 'black'));
        }, 3000);

        return () => clearInterval(intervalId); 
      }, []);

  return (
    <Navbar expand="lg"  className=" bg-danger w-100 sticky-top">
      <Container>
      <Link to={'/'} style={{textDecoration:'none',overflowY:'hidden'}}  >
        <Navbar.Brand className='text-white fw-bolder fs-3' > <i className="fa-regular fs-5  bulb fa-lightbulb" style={{color: bulbColor,overflowY:'hidden'}}></i> Project Hub</Navbar.Brand>
      </Link>
      {
        insideDash && <div className='ms-auto p-3' >
        <button onClick={handleLogout} className='btn btn-warning' >Logout</button>
        </div>
      }
      </Container>
    </Navbar>
  )
}

export default Header
