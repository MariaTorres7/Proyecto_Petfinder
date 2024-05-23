import React, { useRef, useState } from 'react'
import { PlantillaMascota } from '../components/PlantillaMascota'
import { CardMascota } from '../components/CardMascota'
import axios from 'axios'
import axiosClient from '../config/AxiosClient'
import { useNavigate } from 'react-router-dom'

export const RegistrarPets = () => {

    const image = useRef()

    const [formData, setFormData] = useState({
        name: '',
        race: '',
        category: '',
        gender: '',
        // image: null
    })

    const handleChange = (e) => {
        console.log('Escribiendo')
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }))
    }

    const navigate = useNavigate()
    

    const enviarDatos = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('name', formData.name)
        form.append('race', formData.race)
        form.append('category', formData.category)
        form.append('gender', formData.gender)
        form.append('image', image.current.files[0])
        try {
            let response = await axiosClient.post('pets/registrar', form)
            alert(response.data)
            navigate("/dashboard")
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    return (
        <PlantillaMascota imagen="bg.svg">

            <div className='w-full flex flex-col items-center justify-start py-5'>
                <div className='flex justify-around w-full  '>
                    <h2 className='text-white text-lg py-5'>Adicionar Mascota</h2>
                    
                </div>
                <div className='my-10'>
                    <img src="photo-lg-0.svg" alt="" /> <span></span>
                </div>
            </div>

            <div className='w-full px-4'>
                <input
                    type="text"
                    placeholder="Nombre"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-6  bg-white bg-opacity-40 text-slate-600 placeholder-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className='relative'>
                    <select
                        name='race'
                        value={formData.race}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled selected>Seleccione Raza...</option>
                        <option value="1">Labrador</option>
                        <option value="2">Bulldog</option>
                        <option value="3">Beagle</option>
                        <option value="4">Poodle</option>
                    </select>
                    <img className='absolute top-4 right-4' src="arrows.svg" alt="" />
                </div>

                <div className='relative'>
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccione Categoria...</option>
                        <option value="1">Perro</option>
                        <option value="2">Gato</option>
                    </select>
                    <img className='absolute top-4 right-4' src="arrows.svg" alt="" />
                </div>


                <div className='relative'>
                    <input
                        type="file"
                        name='image'
                        ref={image}
                        accept='image/*'

                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full p-3 mb-6 bg-white bg-opacity-40  text-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">Subir Foto
                        <img className='absolute top-4 right-4' src="icon-camera.svg" alt="Camera Icon" />
                    </div>
                </div>

                <div className='relative'>
                    <select
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6   bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Seleccionar Género...</option>
                        <option value="1">Macho</option>
                        <option value="2">Hembra</option>
                    </select>
                    <img className='absolute top-4 right-4' src="arrows.svg" alt="" />
                </div>

            </div>

            <div onClick={enviarDatos} className='w-full flex justify-center'>
                <img src="btn-save.svg" alt="" />
            </div>

        </PlantillaMascota>
    )
}
