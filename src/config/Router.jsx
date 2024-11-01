import React from 'react'
import { Routes,Route,  } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import ImagePage from '../pages/ImagePage'
import CategoryDetails from "../pages/CategoryDetails.jsx";

function Router() {


  return (
    <Routes>
        <Route path='/home' element={<HomePage/>} />
        <Route path='/register' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/image' element={<ImagePage/>} />
        <Route path='/category/:id' element={<CategoryDetails />} />

    </Routes>
  )
}

export default Router