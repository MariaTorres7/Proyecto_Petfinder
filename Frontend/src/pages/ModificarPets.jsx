import React, { useRef, useState, useEffect } from 'react';
import { PlantillaMascota } from '../components/PlantillaMascota';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../config/AxiosClient';

export const ModificarPets = () => {
    const image = useRef();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        race: '',
        category: '',
        gender: '',
        photo: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`pets/buscar/${id}`);
                if (response.data && response.data.length > 0) {
                    const petData = response.data[0];
                    setFormData({
                        name: petData.name_pet,
                        race: petData.race_id,
                        category: petData.category_id,
                        gender: petData.gender_id,
                        photo: petData.photo
                    });
                } else {
                    console.error('No data found for the given ID');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const enviarDatos = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('race', formData.race);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('gender', formData.gender);
        if (image.current.files[0]) {
            formDataToSend.append('photo', image.current.files[0]);
        }

        try {
            const response = await axiosClient.put(`pets/actualizar/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert(response.data.message);
            navigate("/dashboard");
        } catch (error) {
            alert('Error en el servidor');
            console.error('Error en enviarDatos:', error);
        }
    };

    return (
        <PlantillaMascota imagen="../bg.svg">
            <div className='w-full flex flex-col items-center justify-start py-5'>
                <div className='flex justify-around w-full '>
                    <h2 className='text-white text-lg py-5'>Modificar Mascota</h2>
                </div>
                <div className='my-10'>
                    {formData.photo && <img src={`http://localhost:3000/public/${formData.photo}`} alt="" />}
                </div>
            </div>

            <form onSubmit={enviarDatos} className='w-full px-4'>
                <input
                    type="text"
                    placeholder="Nombre"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 bg-white bg-opacity-40 text-slate-600 placeholder-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className='relative'>
                    <select
                        name='race'
                        value={formData.race}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Seleccione Raza...</option>
                        <option value="1">Labrador</option>
                        <option value="2">Bulldog</option>
                        <option value="3">Beagle</option>
                        <option value="4">Poodle</option>
                    </select>
                    <img className='absolute top-4 right-4' src="../arrows.svg" alt="" />
                </div>

                <div className='relative'>
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Seleccione Categoria...</option>
                        <option value="1">Perro</option>
                        <option value="2">Gato</option>
                    </select>
                    <img className='absolute top-4 right-4' src="../arrows.svg" alt="" />
                </div>

                <div className='relative'>
                    <input
                        type="file"
                        name='image'
                        ref={image}
                        accept='image/*'
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full p-3 mb-6 bg-white bg-opacity-40 text-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Subir Foto
                        <img className='absolute top-4 right-4' src="../icon-camera.svg" alt="Camera Icon" />
                    </div>
                </div>

                <div className='relative'>
                    <select
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className="text-slate-600 appearance-none w-full p-3 mb-6 bg-white bg-opacity-40 placeholder-slate-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Seleccionar Género...</option>
                        <option value="1">Macho</option>
                        <option value="2">Hembra</option>
                    </select>
                    <img className='absolute top-4 right-4' src="../arrows.svg" alt="" />
                </div>

                <button type="submit" className='w-full flex justify-center'>
                    <img src="../btn-save.svg" alt="" />
                </button>
            </form>
        </PlantillaMascota>
    );
};
