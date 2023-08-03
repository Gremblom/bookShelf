import mongoose from "mongoose";

const usuarioschema = mongoose.Schema({
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
    },
    rol : {
        type : String,
        default : "USER",
        enum : ["USER", "ADMIN"]
    },
    estado : {
        type : Boolean,
        default : true,
        enum : [true, false]
    }
});

const Usuario = mongoose.model('Usuario', usuarioschema, 'usuarios');

export default Usuario;