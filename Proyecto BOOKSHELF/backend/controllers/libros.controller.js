import Libro from "../models/Libro.js";

const getDatos = async (req, res)=>{
    try {
        const datos = await Libro.find();
        res.json(datos);
    } catch (error) {
        res.status(404);
        res.send(error);
    }
}

const getOne = async (req, res)=>{
    try {
        const datos = await Libro.findOne({_id : req.params.id});
        res.json(datos);
    } catch (error) {
        res.status(404);
        res.send(error);
    }
}

const postDatos = async (req, res)=>{
    try {
        const nombre = await Libro.findOne({"nombre" : req.body.nombre});

        if (nombre){
            return res.status(400).json({
                ms : "El libro ya se encuentra registrado"
            })
        }

        const dato = new Libro(req.body);
        const newDato = await dato.save();
        res.send(newDato);
    } catch (error) {
        res.stauts(404);
        res.send(error);
    }
}

const updateDatos = async (req, res)=>{
    try {
        const updateDato = await Libro.findOneAndUpdate(
            {_id : req.params.id}, req.body, {new : true}
        );
        res.send(updateDato);
    } catch (error) {
        res.status(404);
        res.send(error);
    }
}

const delDatos = async (req, res)=>{
    try {
        await Libro.deleteOne({_id : req.params.id});
        res.send();
    } catch (error) {
        res.status(404);
        res.send(error);
    }
}

export {
    getDatos,
    getOne,
    postDatos,
    updateDatos,
    delDatos
}