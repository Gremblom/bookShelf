import mongoose from "mongoose";

const usuarioschema = Usuario.Schema({
    usuario : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const Usuario = mongoose.model('Usuario', usuarioschema, 'usuarios');

export default Usuario;