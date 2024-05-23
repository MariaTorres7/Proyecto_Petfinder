import React, { useEffect, useState } from 'react';
import { PlantillaMascota } from '../components/PlantillaMascota';
import { useParams } from 'react-router-dom'; // Importar useParams
import axiosClient from '../config/AxiosClient';


export const ConsultarPets = () => {
    const [data, setData] = useState([]);
    const { id } = useParams(); // Obtener el id de los parámetros de la URL

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`pets/listar/${id}`);
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };



        fetchData();
    }, [id]); // Agregar id como dependencia para que se vuelva a ejecutar cuando cambie

    return (
        <>
            <PlantillaMascota imagen="../bg.svg">
                <div className='w-full flex flex-col items-center justify-start py-2'>
                    <div className='flex justify-center w-full'>
                        
                        <h2 className='text-white text-lg py-7'>Consultar Mascota</h2>
                    </div>
                    

                    <div className='py-5'>
                        <img src={`http://localhost:3000/public/${data[0]&&data[0].photo}`} alt="" className='max-w-full h-auto' style={{ width: '180px', height: 'auto' }} />
               
                    </div>
                </div>

                <div className='w-full px-6 space-y-2 p-10'>
                    <div className='w-full h-[50px] overflow-hidden bg-white bg-opacity-60 text-slate-600 rounded-[10px] flex justify-start'>
                        <div className='bg-blue-950 opacity-40 w-[130px] flex items-center justify-center font-bold text-lg text-white/80'>Nombre:</div>
                        <div className='flex items-center pl-3 text-slate-600'>{data[0] && data[0].nombremascota}</div>
                    </div>

                    <div className='w-full h-[50px] overflow-hidden bg-white bg-opacity-60 text-slate-600 rounded-[10px] flex justify-start'>
                        <div className='bg-blue-950 opacity-40 w-[130px] flex items-center justify-center font-bold text-start text-lg text-white/80'>Raza:</div>
                        <div className='flex items-center pl-3 text-slate-600'>{data[0] && data[0].nombreraza}</div>
                    </div>

                    <div className='w-full h-[50px] overflow-hidden bg-white bg-opacity-60 text-slate-600 rounded-[10px] flex justify-start'>
                        <div className='bg-blue-950 opacity-40 w-[130px] flex items-center justify-center font-bold text-lg text-white/80'>Categoría:</div>
                        <div className='flex items-center pl-3 text-slate-600'>{data[0] && data[0].nombrecategoria}</div>
                    </div>

                    <div className='w-full h-[50px] overflow-hidden bg-white bg-opacity-60 text-slate-600 rounded-[10px] flex justify-start'>
                        <div className='bg-blue-950 opacity-40 w-[130px] flex items-center justify-center font-bold text-lg text-white/80'>Género:</div>
                        <div className='flex items-center pl-3 text-slate-600'>{data[0] && data[0].nombregenero}</div>
                    </div>
                </div>
            </PlantillaMascota>
        </>
    );
};
