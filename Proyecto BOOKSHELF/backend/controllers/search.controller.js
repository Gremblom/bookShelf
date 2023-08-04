import {response} from "express";
import mongoose from "mongoose";

import Libro from "../models/Libro.js";
import Usuario from "../models/Usuario.js";

const allowedCollections = [
    'usuarios',
    'libros'
];

const searchUsers = async (criterio = '', res = response)=>{
    const isMongoId = mongoose.Types.ObjectId.isValid(criterio);

    try {
        if (isMongoId){
            const usuario = await Usuario.findById(criterio);

            return res.json({
                results : (usuario) ? [usuario] : []
            });
        }
        
        const regex = new RegExp(criterio, 'i');
        const usuario = await Usuario.find({
            $or : [{usuario : regex}, {email : regex}],
            $and : [{estado : true}]
        });

        res.json(usuario)
    } catch (error) {
        console.log(error);
    }
}

const searchLibros = async (criterio = '', res = response)=>{
    const isMongoId = mongoose.Types.ObjectId.isValid(criterio);

    try {
        if (isMongoId){
            const libro = await Libro.find(criterio);

            return res.json({
                results : (libro) ? [libro] : []
            });
        }

        const regex = new RegExp(criterio, 'i');
        const libro = await Libro.find({
            $or : [{nombre : regex}, {genero : regex}],
            $and : [{estado : true}]
        });

        res.json(libro);
    } catch (error) {
        console.log(error);
    }
}

const search = (req, res = response)=>{
    const {coleccion, criterio} = req.params;

    if (!allowedCollections.includes(coleccion)){
        return res.status(400).json({
            msg: `El buscador solo permite las colecciones ${allowedCollections}`
        })
    }

    switch (coleccion){
        case 'usuarios':
            searchUsers(criterio, res);
            break;

        case 'libros':
            searchLibros(criterio, res);
            break;

        default:
            res.status(400).json({
                msg : "This search doesn't exists"
            });
    }
}

export default search;