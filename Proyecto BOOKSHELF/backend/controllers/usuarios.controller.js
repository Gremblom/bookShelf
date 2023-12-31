import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs"

const getUsuarios = async (req, res)=>{
    try {
        const datos = await Usuario.find();
        res.json(datos);
    } catch (error) {
        console.log(error);
    }
}

const getUsuario = async (req, res)=>{
    try {
        const {id} = req.params;

        const usuario = await Usuario.findOne({_id : id});

        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

const postUsuarios = async (req, res)=>{
    try {
        const {password} = req.body;
        const newDato = new Usuario(req.body);

        const salt = bcryptjs.genSaltSync();
        newDato.password = bcryptjs.hashSync(password, salt);

        await newDato.save();

        res.status(201).json(newDato);
    } catch (error) {
        console.log(error);
    }
}

const deleteUsuario = async (req, res)=>{
    try {
        const {id} = req.params;

        const dato = await Usuario.findByIdAndUpdate(id, {estado : false});

        res.json(dato)
    } catch (error) {
        console.log(error);
    }
}

const updateUsuario = async (req, res)=>{
    try {
        const {id} = req.params;

        const {_id, password, ...resto} = req.body;

        const oldDato = await Usuario.findOne({_id : id});

        const passwordCheck = bcryptjs.compareSync(password, oldDato.password);

        if (passwordCheck){
            await Usuario.findByIdAndUpdate(id, resto, {new : true});

            res.json({msg : "Usuario actualizado"});
        } else {
            return res.json({
                msg : "Contraseña incorrecta"
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const updatePassword = async (req, res)=>{
    try {
        const {id} = req.params;
        const {newPassword} = req.body;

        await Usuario.findByIdAndUpdate(id, {password : newPassword});
        res.json({
            msg : "Usuario actualizado correctamente"
        })
    } catch (error) {
        
    }
}

export {
    getUsuarios,
    getUsuario,
    postUsuarios,
    deleteUsuario,
    updateUsuario,
    updatePassword
}