import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { RegistrarPets } from './pages/RegistrarPets'
import { ModificarPets } from './pages/ModificarPets'
import { ConsultarPets } from './pages/ConsultarPets'


export const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/registrar' element={<RegistrarPets/>}/>
        <Route path='/modificar/:id' element={<ModificarPets/>}/>
        <Route path='/consultar/:id' element={<ConsultarPets/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}


