
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import './App.css'/
import UserLogin from './pages/UserComponent/UserLogin'  
import Dashboard from './pages/Dashboard'
import SignupUser from './pages/UserComponent/SignupUser'
import CaptainSignup from './pages/CaptainComponent.jsx/CaptainSignup'
import CaptainLogin from './pages/CaptainComponent.jsx/CaptainLogin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<SignupUser/>}/>
      <Route path='/captainlogin' element={<CaptainLogin/>}/>
      <Route path='/captainsignup' element={<CaptainSignup/>}/>
      <Route path='*'  element={<h1 className='text-center text-[100px]'>404 Not Found</h1>}/>
    </Routes>
  
  )
}

export default App
