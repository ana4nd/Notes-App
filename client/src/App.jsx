
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyEmail from './components/VerifyEmail'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ChangePassword from './pages/ChangePassword'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  
  return (
    <>
    <Navbar/>
    
      <Routes>
        <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/verify' element = {<ProtectedRoute><VerifyEmail/></ProtectedRoute>}/>
        <Route path='/verify/:token' element = {<ProtectedRoute><Verify/></ProtectedRoute>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/forgot-password' element = {<ForgotPassword/>}/>
        <Route path='/verify-otp/:email' element = {<VerifyOtp/>}/>
        <Route path='/change-password/:email' element = {<ChangePassword/>}/>
      </Routes>
    </>
  )
}

export default App
