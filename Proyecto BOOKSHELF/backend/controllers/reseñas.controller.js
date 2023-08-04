import Reseña from "../models/Reseña.js";

const getReseñas = async (req, res)=>{
    try {
        const {id} = req.params;

        const reseñas = await Reseña.find({
            "usuario" : {$in : [id]},
            "estado" : {$in : [true]}
        });

        res.json(reseñas);
    } catch (error) {
        console.log(error);
    }
}

const postReseña = async (req, res)=>{
    
}