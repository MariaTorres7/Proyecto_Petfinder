import { pool } from "../database/conexion.js";

export const listarUser = async (req, res) => {
    try {
        let sql = "SELECT * FROM users"
        let [result] = await pool.query(sql)

        if (result.length >0 ) {
            res.status(201).json(result)
        }

        else {
            res.status(404).json({"Mensaje": "No se encontraron usuarios"}
            )
        }
        } 
        
        catch (error) {
            console.log(error)
        }
}


export const registrarUser = async (req, res) => {
    try {
        let {fullname, email, password} = req.body
        let sql = "INSERT INTO users (fullname, email, password) VALUES (?,?,?)"
        await pool.query(sql,[fullname, email, password])
        res.status(201).json({success: true, message: "Usuario registrado exitosamente"})
    } catch (error) {
        return res.status(500).json({'Mensaje': 'Error' + error})
    }
}


export const eliminarUser= async (req, res) => {
    try {
        const id = req.params.id
        let sql = "DELETE FROM users WHERE id_user = ?"
        const [result] = await pool.query(sql, [id])
        return res.status(201).json ({"mensaje": "Se eliminó el usuario"})
    } 
    
    catch (error) {
        return res.status(404).json({'mensaje': "Error del servidor"})
    }
}

export const actualizarUser = async (req, res) => {
    try {
        const id = req.params.id
        let {fullname, email, password} = req.body
        let sql = `UPDATE users SET fullname = '${fullname}', email = '${email}', password = '${password}'`
        let [result] = await pool.query(sql)

        if (result.length > 0) {
            res.status(201).json ({"mensaje": "Se actualizó el usuario"})
        }
    } catch (error) {
        return res.status(500).json ({"mensaje": "Error del servidor"})
    }
}