import axios from 'axios'
import React, { useState } from 'react'
import axiosClient from '../config/AxiosClient'
import { useNavigate } from 'react-router-dom';



export const Logout = () => {

    const [mostrarModal, setMostrarModal] = useState(false)
    const navigate = useNavigate();

    const cerrarSession = async (e) => {

        localStorage.clear();


        navigate('/');

    }


    return (

        <>
            <button onClick={() => setMostrarModal(true)}>
                <img className='z-50' src="../btn-close.svg" alt="" />
            </button>
            {mostrarModal && (
                <>
                    <div className='z-50 bg-black/80 h-full text-black  flex-col fixed inset-0 left-0 top-0  w-full flex justify-center items-center'>
                        <div className='flex flex-col items-center  p-5 rounded-lg bg-gray-100 w-[375px]'>
                            <h2>Seguro que quieres cerrar Session</h2>

                            <div className='flex gap-x-3 mt-6'>
                                <button className='px-3 py-2 bg-blue-600 rounded-md ' onClick={() => setMostrarModal(false)}>
                                    Cancelar
                                </button>
                                <button className='px-3 py-2 bg-red-600 rounded-md ' onClick={cerrarSession}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                </>
            )

            }
        </>
    )
}


