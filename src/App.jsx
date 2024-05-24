import './App.css'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'
import Record from './Pages/Record/Record'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from './state/AuthContext'
import Messages from './components/Messages/Messages'
import Follows from './Pages/Follows/Follows'
import Followers from './Pages/Followers/Followers'
import Search from './Pages/Search/Search'
import EditProf from './Pages/EditProf/EditProf'
import EditPost from './Pages/EditPost/EditPost'


function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />}/>
          <Route path="/messages/:postId" element={<Messages />}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
          <Route path="/profile/:userId" element={<Profile />}/>
          <Route path="/post/:userId" element={<Record />}/>
          <Route path="/follow/:userId/" element={<Follows />}/>
          <Route path="/follower/:userId/" element={<Followers />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/editProf/:userId" element={<EditProf />}/>
          <Route path="/editPost/:postId" element={<EditPost />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
