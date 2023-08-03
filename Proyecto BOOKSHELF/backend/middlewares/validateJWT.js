import {response, request} from "express";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

const validateJWT = async (req = request, res = response, next)=>{
    const token = req.header("jwt");

    if (!token){
        return res.status(400).json({
            msg : "Se requiere un jsonwebtoken"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(400).json({
                msg : "Token inválido - Usuario no se encuentra registrado en la base de datos"
            });
        }

        if (!usuario.estado){
            return res.status(400).json({
                msg : "Token inválido - Usuario se encuentra inactivo"
            });
        }

        req.usuario = usuario;
        console.log("req usuario en validate", req.usuario);

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg : "Token inválido"
        })
    }
}

export default validateJWT;