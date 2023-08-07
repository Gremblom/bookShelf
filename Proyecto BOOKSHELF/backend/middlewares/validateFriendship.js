import Amigo from "../models/Amigo.js";

const friendShipExists = async (req, res, next)=>{
    const {usuario2} = req.body;
    const {_id} = req.usuario;

    const amistad = await Amigo.findOne({
        $or : [{usuario2}],
        $and : [{usuario1 : _id}]
    });

    if (amistad != null){
        return res.status(400).json({
            msg : "Este usuario ya está registrado en tu lista de amigos",
            available : false
        });
    }

    next();
}

export default friendShipExists;