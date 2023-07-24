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
    }
},
{
    timestamps : true
});

const Libro = mongoose.model('Libro', libroSchema, 'libros');

export default Libro;