import Favorito from "../models/Favorito.js";

const getFavoritos = async (req, res)=>{
    try {
        const {id} = req.params;

        const favoritos = await Favorito.find({
            "usuario" : {$in : [id]},
            "estado" : {$in : [true]}
        })
        .populate('libro', ['_id', 'nombre', 'genero', 'autor'])

        res.json(favoritos);
    } catch (error) {
        console.log(error);
    }
}

const postFavorito = async (req, res)=>{
    try {
        const {libro} = req.body;
        
        const data = {
            libro,
            usuario : req.usuario._id
        }

        const favorito = new Favorito(data);
        await favorito.save();

        res.status(201).json({
            favorito,
            register : true
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteFavorito = async (req, res)=>{
    try {
        const {id} = req.params;

        const dato = await Favorito.findByIdAndDelete(id);

        res.json(dato);
    } catch (error) {
        console.log(error);
    }
}

export {
    getFavoritos,
    postFavorito,
    deleteFavorito
}