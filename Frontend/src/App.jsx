
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import './App.css'/
import UserLogin from './pages/UserComponent/UserLogin'  
import SignupUser from './pages/UserComponent/SignupUser'
import  ForgotPassword from './pages/ForgotPassword'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/forgot' element={<ForgotPassword/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<SignupUser/>}/>
      <Route path='/captainlogin' element={<CaptainLogin/>}/>
      <Route path='/captainsignup' element={<CaptainSignup/>}/>
    </Routes>
  
  )
}

export default App
