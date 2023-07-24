import mongoose from "mongoose";

const coneccion = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log("Conexion exitosa");
    } catch (error) {
        console.log(error);
    }
}

export default coneccion;