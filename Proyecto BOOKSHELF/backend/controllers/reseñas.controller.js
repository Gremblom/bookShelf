import Reseña from "../models/Reseña.js";

const getReseñasUsuario = async (req, res)=>{
    try {
        const {id} = req.params;

        const reseñas = await Reseña.find({
            "usuario" : {$in : [id]},
            "estado" : {$in : [true]}
        })
        .populate('libro', 'nombre');

        res.json(reseñas);
    } catch (error) {
        console.log(error);
    }
}

const getReseñasLibro = async (req, res)=>{
    try {
        const {id} = req.params;

        const reseñas = await Reseña.find({
            "libro" : {$in : [id]},
            "estado" : {$in : [true]}
        })
        .populate('usuario', 'usuario');

        res.json(reseñas);
    } catch (error) {
        
    }
}

const postReseña = async (req, res)=>{
    try {
        const {id} = req.params;

        const {calificacion, comentario} = req.body;
    
        const datos = {
            libro : id,
            usuario : req.usuario._id,
            calificacion,
            comentario
        }
    
        const newReseña = new Reseña(datos);
        await newReseña.save();
        res.json(newReseña);   
    } catch (error) {
        console.log(error);
    }
}

export {
    getReseñasUsuario,
    getReseñasLibro,
    postReseña
}