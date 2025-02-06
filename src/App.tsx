import Landing from "./pages/Landing/Landing"
import Login from "./pages/Auth/Login/Login"
import Register from "./pages/Auth/Register/Register"
import NotFound from "./pages/Auth/Not-Found/Not-Found"
import Dashboard from "./pages/Dashboard/Dashboard"
import ForgetPassword from "./pages/Auth/forgetpassword/ForgetPassword"
import UpdatePassword from "./pages/Auth/UpdatePassword/UpdatePassword"
import { Route, Routes } from "react-router-dom"
import Otp from "./pages/Auth/Otp/Otp"
import IsAchive from "./pages/IsAchive/IsAchive"
import Trash from "./pages/Trash/Trash"
import Reminder from "./pages/Reminder/Reminder"
import Profile from "./pages/Profile/Profile"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/"  element={<Landing/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/otp-verify"  element={<Otp/>}/>
      <Route path="/forget-password"  element={<ForgetPassword/>}/>
      <Route path="/update-password"  element={<UpdatePassword/>}/>
      <Route path="/dashboard"  element={<Dashboard/>}/>
      <Route path="/dashboard/isachive"  element={<IsAchive/>}/>
      <Route path="/dashboard/trash"  element={<Trash/>}/>
      <Route path="/dashboard/remind"  element={<Reminder/>}/>
      <Route path="/dashboard/profile"  element={<Profile/>}/>
      <Route path="/*"  element={<NotFound/>}/>
    </Routes>
  
  )
}

export default App
