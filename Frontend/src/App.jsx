
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import './App.css'/
import UserLogin from './pages/UserComponent/UserLogin'  
import Dashboard from './pages/Dashboard'
import SignupUser from './pages/UserComponent/SignupUser'
import SignupCaptain from './pages/CaptainComponent/SignupCaptain'
import LoginCaptain from './pages/CaptainComponent/LoginCaptain'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<UserProtectedWrapper>
        <Dashboard/>
      </UserProtectedWrapper>
        }/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<SignupUser/>}/>
      <Route path='/captain-login' element={<LoginCaptain/>}/>
      <Route path='/captain-signup' element={<SignupCaptain/>}/>
      <Route path='*'  element={<h1 className='text-center text-[100px]'>404 Not Found</h1>}/>
    </Routes>
  
  )
}

export default App
