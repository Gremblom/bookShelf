import mongoose from "mongoose";

const favoritoSchema = mongoose.Schema({
    usuario : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    }, libro : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Libro',
        required : true
    }, estado : {
        type : Boolean,
        default : true,
        enum : [true, false]
    }
});

const Favorito = mongoose.model('Favorito', favoritoSchema, 'favoritos');

export default Favorito;