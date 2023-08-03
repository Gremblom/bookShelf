import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
    rol : {
        type : String,
        required : true,
        enum : ["USER", "ADMIN"]
    }
});

const Rol = mongoose.model('Rol', rolSchema, 'roles');

export default Rol;