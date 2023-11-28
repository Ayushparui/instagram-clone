import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Layout from './component/Layout';
import Insta from './pages/Insta';
import Profile from './pages/Profile';
import Posts from './pages/Posts'
import AUsers from './pages/AUsers';
import Missing from './component/Missing'
import RequiredAuth from './component/RequiredAuth';
import Register from './component/Register'
import Login from './component/Login'
import InstaLayout from './component/InstaLayout';
function App() {


  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Public ROutes */}
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />


        {/* Private Routes */}
        <Route element={<RequiredAuth />}>
          <Route element={<InstaLayout />}>
            <Route path='instagram' element={<Insta />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='posts' element={<Posts />} />
            <Route path='users' element={<AUsers />} />
          </Route>
        </Route>

        {/* Missing Path */}
        <Route path='*' element={<Missing />} />

      </Route>
    </Routes>
  )
}

export default App
