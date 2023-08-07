import Amigo from "../models/Amigo.js";

const getAmigos = async (req, res)=>{
    try {
        const {id} = req.params;

        const amigos = await Amigo.find({usuario1 : id})
        .populate('usuario2', ['usuario', '_id']);

        res.json(amigos);
    } catch (error) {
        console.log(error);
    }
}

const newAmistad = async (req, res)=>{
    try {
        const {usuario2} = req.body;

        const datos = {
            usuario1 : req.usuario._id,
            usuario2
        }

        const newFriend = new Amigo(datos);
        await newFriend.save();

        res.json(newFriend);
    } catch (error) {
        console.log(error);
    }
}

const deleteAmistad = async (req, res)=>{
    try {
        const {id} = req.params;

        const datos = await Amigo.findByIdAndDelete(id);

        res.json(datos);
    } catch (error) {
        console.log(error);
    }
}

export {
    getAmigos,
    newAmistad,
    deleteAmistad
}