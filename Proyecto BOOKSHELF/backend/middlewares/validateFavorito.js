import Favorito from "../models/Favorito.js";

const favoritoExists = async (req, res, next)=>{
    const {libro} = req.body;
    const {_id} = req.usuario;

    const libroExiste = await Favorito.findOne({libro});
    const usuarioExiste = await Favorito.findOne({usuario : _id});

    if (libroExiste && usuarioExiste){
        return res.status(400).json({
            msg : "Este usuario ya agregó este libro a su lista de favoritos"
        });
    }
    next();
}

export default favoritoExists;