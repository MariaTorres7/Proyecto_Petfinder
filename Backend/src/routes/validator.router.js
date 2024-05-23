import { Router } from "express";
import { ValidarUsuario } from "../controllers/validator.controller.js";

const route = Router()

route.post('/login', ValidarUsuario)


export default route