import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Logout } from './Logout';


export const PlantillaMascota = ({ children, imagen, iconos }) => {

  const navigate = useNavigate()

  const volverAtras = () => {
         navigate("/dashboard")
  }


  return (
    <>
      <div className='w-full relative h-screen flex justify-center items-center'>
        
        <div className='w-[400px] h-[844px] relative' style={{ backgroundImage: `url(${imagen})`, backgroundRepeat: 'no-repeat' }}>
        <div className={`${iconos}`}>
        <div className='absolute z-30 top-5 right-3 w-7 py-4'>
          <Logout/>
        </div>
        <div onClick={volverAtras} className='absolute z-20 cursor-pointer top-7 left-3 w-7 py-4'>
          <img className='cursor-pointer z-30' src="../btn-back.svg" alt="" />
        </div>
        </div>
          {children}
        </div>
      </div>
    </>
  );
}
