import { Router } from "express";
import { actualizarUser, eliminarUser, listarUser, registrarUser } from "../controllers/users.controller.js";

const route = Router()

route.get("/listar", listarUser)
route.post("/registrar", registrarUser)
route.delete("/eliminar/:id", eliminarUser)
route.put("/actualizar/:id", actualizarUser)

export default route