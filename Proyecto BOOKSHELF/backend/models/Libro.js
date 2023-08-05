import mongoose from "mongoose";

const libroSchema = mongoose.Schema({
    nombre : {
        type : String,
        required : true
    },
    genero : {
        type : String,
        required : true
    },
    autor : {
        type : String,
        required : true
    },
    sinopsis : {
        type : String,
        required : true
    },
    estado : {
        type : Boolean,
        default : true,
        enum : [true, false]
    }
},
{
    timestamps : true
});

const Libro = mongoose.model('Libro', libroSchema, 'libros');

export default Libro;