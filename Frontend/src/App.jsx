
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import './App.css'/
import UserLogin from './pages/UserComponent/UserLogin'  
import Dashboard from './pages/UserComponent/Dashboard'
import SignupUser from './pages/UserComponent/SignupUser'
import SignupCaptain from './pages/CaptainComponent/SignupCaptain'
import LoginCaptain from './pages/CaptainComponent/LoginCaptain'
import UserProtectedWrapper from './pages/UserComponent/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainComponent/CaptainProtectedWrapper'
import CaptainHome from './pages/CaptainComponent/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainComponent/CaptainRiding'
import 'remixicon/fonts/remixicon.css'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<UserProtectedWrapper>
        <Dashboard/>
      </UserProtectedWrapper>
        }/>
      <Route path='/captain-home' element={<CaptainProtectedWrapper>
        <CaptainHome/>
      </CaptainProtectedWrapper>
        }/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<SignupUser/>}/>
      <Route path='/captain-login' element={<LoginCaptain/>}/>
      <Route path='/captain-riding' element={<CaptainRiding/>}/>
      <Route path='/captain-signup' element={<SignupCaptain/>}/>
      <Route path ='/riding' element ={<Riding/>}/>
      <Route path='*'  element={<h1 className='text-center text-[100px]'>404 Not Found</h1>}/>
    </Routes>
  
  )
}

export default App
