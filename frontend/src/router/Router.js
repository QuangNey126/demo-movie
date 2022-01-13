import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import User from '../pages/User'
import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail'
import Login from '../components/Login'
import Register from '../components/Register'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<User />} />
            <Route path='/:category' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
            <Route path='/:category/search/:keywords' element={<Catalog />} />
            {/* <Route path='/:category/search/:keywords' element={<Catalog />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}

export default Router
