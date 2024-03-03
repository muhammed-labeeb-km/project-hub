import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dash from './pages/Dash'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/TokenAuth'

function App() {
const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  return (
    <div  >
      <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/login' element={<Auth/>} />
          <Route path='/register' element={<Auth insideRegister />} /> 
          <Route path='/dash' element={ isAuthorised? <Dash/> : <Home></Home> } /> 
          <Route path='/projects' element={ isAuthorised? <Projects/> :<Home></Home> } />
          <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
