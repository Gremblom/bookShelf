import express from "express";
import cors from "cors";
import conexion from "../database/connection.js";
import libroRouter from "../routes/libros.router.js";

class Server {

    constructor(){
        this.app = express();

        this.configCors = {
            methods : ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }            
        
        this.middlewares();

        this.conexion = conexion();

        this.rutas = {
            libros : "/libros"
        }
        this.routes();
        this.port = process.env.PORT;
    }

    listener(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor abierto en el puerto ${this.port}`);
        })
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors(this.configCors));
    }

    routes(){
        this.app.use(this.rutas.libros, libroRouter);
    }
}

export default Server;