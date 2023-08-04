import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";
import Favorito from "../models/Favorito.js";

const isValidRol = async (rol = '')=>{
    const existeRol = await Rol.findOne({rol});

    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const existeEmail = async (email = '')=>{
    const existeEmail = await Usuario.findOne({email});
    
    if (existeEmail){
        throw new Error(`El correo ya se encuentra registrado en la base de datos`);
    }
}

const usuarioExiste = async (id)=>{
    const usuarioExiste = await Usuario.findOne({_id : id});

    if (!usuarioExiste){
        throw new Error(`El usuario que está tratando de buscar no existe`);
    }
}

const favoritoExiste = async (id)=>{
    const favoritoExiste = await Favorito.findOne({_id : id});

    if (!favoritoExiste){
        throw new Error(`El favorito que está tratando de buscar no existe`);
    }
}

export {
    isValidRol,
    existeEmail,
    usuarioExiste,
    favoritoExiste
}