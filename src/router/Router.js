import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:category' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
            <Route path='/:category/search/:keywords' element={<Catalog />} />
        </Routes>
    )
}

export default Router
