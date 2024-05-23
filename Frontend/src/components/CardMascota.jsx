import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ModalEliminar } from './ModalEliminar'
import { Link } from 'react-router-dom'
import axiosClient from '../config/AxiosClient'


export const CardMascota = () => {
const [data, setData] = useState([]) 


    const listarMascotas = async () => {

        let response = await axiosClient.get("pets/listar")
        console.log(response.data)

        setData(response.data)
    }

    useEffect(()=> {
        listarMascotas()
    })



    return (
        <>
            {data.map((item, index)=>(
                <div key={index} className='relative w-full rounded-3xl bg-white/45 flex justify-between items-center p-3'>
            
                <div className='flex items-center gap-x-2 '>
                <div>
                    <img className='w-20 h-20' src={item.photo ? `http://localhost:3000/public/${item.photo}` : ''} alt="" />
                </div>

                    <div>
                        <h3>{item.nombremascota}</h3>
                        <span>{item.nombreraza}</span>
                    </div>
                </div>
                <div className='flex gap-2'> 
                    <Link to={`/consultar/${item.id_pet}`}>
                    <button>
                        <img src="btn-show.svg" alt="" />
                    </button>
                
                    </Link>
                <Link to={`/modificar/${item.id_pet}`}>
                    
                <button>
                        <img src="btn-edit.svg" alt="" />
                    </button>
                </Link>
    
                <ModalEliminar id={item.id_pet}/>
                </div>
            </div>
            ))}
        </>
    )
}
