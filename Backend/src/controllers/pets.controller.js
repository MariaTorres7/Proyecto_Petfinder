import { pool } from "../database/conexion.js";
import path from 'path'


export const listarPets = async (req, res) => {
    try {

        let sql = `SELECT p.id_pet, p.name_pet AS nombremascota, r.name AS nombreraza, c.name AS nombrecategoria, g.name AS nombregenero, p.photo FROM pets p
        JOIN races r ON p.race_id = r.id_race
        JOIN categories c ON p.category_id = c.id_category
        JOIN genders g ON p.gender_id = g.id_gender    
        `
        let [result] = await pool.query(sql)

        if(result.length > 0) {
            res.status(200).json(result)
            }
        else {
            res.status(404).json({"Mensaje": "No se encontraron mascotas"})
            } 
        }
        
        
    catch (error) {
        console.log(error)
        }
}

export const registrarPets = async (req, res) => {
    try {

        const multimedia = req.file ? path.basename(req.file.path) : null;

        if (!multimedia) {
            return res.status(400).json({message: "Se requiere una imagen"})
        }

        let {name, race, category, gender} = req.body
        const sql = "INSERT INTO pets (name_pet, race_id, category_id, photo, gender_id) VALUES (?, ?, ?, ?, ?)"
        await pool.query(sql,[name, race, category, multimedia, gender])
        res.status(201).json({ success: true, message: "Mascota registrada con éxito"})
        }
        
    catch (error) {
        return res.status(500).json({ 'message': 'Error' + error})
        }
}


export const eliminarPets = async (req, res) => {
    try {
        const id = req.params.id
        const query = 'DELETE FROM pets WHERE id_pet = ?'
        const [result] = await pool.query(query, [id])
        return res.status(200).json(result)
        } 
    
    catch (error) {
        console.error('Error', error)
        return res.status(500).json ({"message": "Error en el servidor"})
        }
}

export const actualizarPets = async (req, res) => {
    try {
        const { name, race, category, gender } = req.body;
        const id = req.params.id;

        const multimedia = req.file ? path.basename(req.file.path) : null;

        let sql;
        let params;

        if (multimedia) {
            // Si hay una imagen nueva, actualizamos todos los campos, incluyendo la imagen
            sql = "UPDATE pets SET name_pet = ?, race_id = ?, category_id = ?, photo = ?, gender_id = ? WHERE id_pet = ?";
            params = [name, race, category, multimedia, gender, id];
        } else {
            // Si no hay una imagen nueva, solo actualizamos los campos sin la imagen
            sql = "UPDATE pets SET name_pet = ?, race_id = ?, category_id = ?, gender_id = ? WHERE id_pet = ?";
            params = [name, race, category, gender, id];
        }

        const [result] = await pool.query(sql, params);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Se actualizó la mascota" });
        } else {
            res.status(404).json({ message: "No se encontró la mascota con el ID proporcionado" });
        }
    } catch (error) {
        console.error('Error en actualizarPets:', error);
        res.status(500).json({ message: "Error del servidor" });
    }
}



export const buscarPorId = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT * FROM pets WHERE id_pet = ?`
        let [result] = await pool.query(sql, [id])

        if(result.length > 0) {
            res.status(200).json(result)
            }
        else {
            res.status(404).json({"Mensaje": "No se encontraron mascotas"})
            } 
        }
        
        
    catch (error) {
        console.log(error)
        }
}

export const buscarPorIdDos = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT p.id_pet, p.name_pet AS nombremascota, r.name AS nombreraza, c.name AS nombrecategoria, g.name AS nombregenero, p.photo FROM pets p
        JOIN races r ON p.race_id = r.id_race
        JOIN categories c ON p.category_id = c.id_category
        JOIN genders g ON p.gender_id = g.id_gender  WHERE id_pet = ?  
        `
        let [result] = await pool.query(sql, [id])

        if(result.length > 0) {
            res.status(200).json(result)
            }
        else {
            res.status(404).json({"Mensaje": "No se encontraron mascotas"})
            } 
        }
        
        
    catch (error) {
        console.log(error)
        }
}