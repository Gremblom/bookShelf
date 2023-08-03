import Favorito from "../models/Favorito.js";

const postFavorito = async (req, res)=>{
    try {
        const {libro} = req.body;
        
        const data = {
            libro,
            usuario : req.usuario._id
        }

        const favorito = new Favorito(data);
        await favorito.save();

        res.status(201).json(favorito);
    } catch (error) {
        console.log(error);
    }
}

export {
    postFavorito
}