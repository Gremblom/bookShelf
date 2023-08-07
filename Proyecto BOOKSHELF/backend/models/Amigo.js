import mongoose from "mongoose";

const amigoSchema = mongoose.Schema({
    usuario1 : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    usuario2 : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    }
});

const Amigo = mongoose.model('Amigo', amigoSchema, 'amigos');

export default Amigo;