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
    reseña : {
        type : String,
        required : true
    },
    calificacion : {
        type : Number,
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