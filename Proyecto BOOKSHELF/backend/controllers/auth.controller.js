import bcryptjs from "bcryptjs";
import {response} from "express";

import generateJWT from "../helpers/generateJWT.js";
import Usuario from "../models/Usuario.js";

const login = async (req, res = response)=>{
    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario){
            return res.status(400).json({
                msg : "Usuario incorrecto"
            });
        }

        if (!usuario.estado){
            return res.status(400).json({
                msg : "Usuario se encuentra inactivo"
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword){
            return res.status(400).json({
                msg : "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.json({
            msg : "Contacte al servicio técnico"
        });
    }
}

const verify = async (req, res)=>{
    try {
        res.json({
            msg : "Usuario validado exitosamente",
            validToken : true
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    login,
    verify
}