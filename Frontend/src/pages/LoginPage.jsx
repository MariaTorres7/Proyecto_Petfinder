import React, { useState, useEffect } from 'react'
import { PlantillaMascota } from '../components/PlantillaMascota'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/AxiosClient'

export const LoginPage = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate("/dashboard")
      }
  }, [navigate]);

    const handleSubmit = async (event) => {
      event.preventDefault()

      try {
        const data = {email: email, password}
        const response = await axiosClient.post ('login', data)

        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('fullname', response.data.fullname)
          navigate("/dashboard")
        } else {
          navigate("/")
        }
      } catch (error) {
        console.error('Error', error)

        
      }

        
    }

  return (
    <>
    <PlantillaMascota imagen='bg-login.svg' iconos="hidden">

    <div className="w-96 bottom-20 absolute left-2 px-1">
        <form className="w-full flex flex-col items-center justify-center space-y-5">
          <input
          onChange={handleEmailChange}
          value={email}
            type="text"
            placeholder="Correo Electrónico"
            className="w-full p-3 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
          onChange={handlePasswordChange}
          value={password}
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-900 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
        
            Ingresar
          </button>
        </form>
      </div>

    </PlantillaMascota>
    </>
  )
}
