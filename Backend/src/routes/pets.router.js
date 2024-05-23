import { Router } from "express";
import { actualizarPets, buscarPorId, buscarPorIdDos, eliminarPets, listarPets, registrarPets } from "../controllers/pets.controller.js";
import upload from "../libs/storage.js";
import { validarToken } from "../controllers/validator.controller.js";
const route = Router()

route.get('/listar',validarToken , listarPets)
route.get('/listar/:id',validarToken , buscarPorIdDos)
route.post('/registrar', validarToken, upload.single('image'),registrarPets)
route.delete('/eliminar/:id', validarToken, eliminarPets)
route.put('/actualizar/:id', validarToken, upload.single('photo'), actualizarPets);
route.get('/buscar/:id',validarToken, buscarPorId)

export default route