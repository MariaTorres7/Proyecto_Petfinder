import React from 'react'
import { PlantillaMascota } from '../components/PlantillaMascota'
import { CardMascota } from '../components/CardMascota'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {

  const navigate = useNavigate()

  const registrarMascotas = () => {
         navigate("/registrar")
  }

  return (
    <PlantillaMascota imagen="bg.svg">
      <div className='p-5 relative flex flex-col items-center justify-start'>
        <h2  className='text-white text-lg'>Administrar Mascotas</h2>
        <div className='mt-12 cursor-pointer' onClick={registrarMascotas}>
          <img src="btn-add.svg" alt="" /> <span></span>
        </div>
      </div>

    <div className='px-4 flex flex-col gap-y-3'>
    <CardMascota/>
 
    </div>

    </PlantillaMascota>
  )
}
