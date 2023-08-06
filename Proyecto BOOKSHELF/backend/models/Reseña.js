import mongoose from "mongoose";

const reseñaSchema = mongoose.Schema({
    libro : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Libro',
        required : true
    },
    usuario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    calificacion : {
        type : Number,
        required : true
    },
    comentario : {
        type : String,
        required : true
    },
    estado : {
        type : Boolean,
        default : true,
        enum : [true, false]
    }
});

const Reseña = mongoose.model('Reseña', reseñaSchema, 'reseñas');

export default Reseña;