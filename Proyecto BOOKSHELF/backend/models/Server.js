import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import conexion from "../database/connection.js";
import libroRouter from "../routes/libros.router.js";
import usuariosRouter from "../routes/usuarios.router.js";
import authRouter from "../routes/auth.router.js";
import favRouter from "../routes/favoritos.router.js";
import searchRouter from "../routes/search.router.js";
import uploadRouter from "../routes/upload.router.js";
import reseñaRouter from "../routes/reseñas.router.js";

class Server {

    constructor(){
        this.app = express();

        this.configCors = {
            methods : ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }            
        
        this.middlewares();

        this.conexion = conexion();

        this.rutas = {
            libros : "/libros",
            usuarios : "/usuarios",
            auth : "/auth",
            fav : "/fav",
            search : "/search",
            uploads : "/uploads",
            reseñas : "/resenas"
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp'
        }));
    }

    routes(){
        this.app.use(this.rutas.libros, libroRouter);
        this.app.use(this.rutas.usuarios, usuariosRouter);
        this.app.use(this.rutas.auth, authRouter);
        this.app.use(this.rutas.fav, favRouter);
        this.app.use(this.rutas.search, searchRouter);
        this.app.use(this.rutas.uploads, uploadRouter);
        this.app.use(this.rutas.reseñas, reseñaRouter);
    }
}

export default Server;