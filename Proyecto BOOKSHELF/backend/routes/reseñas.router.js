import {Router} from "express";
import {check} from "express-validator";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import {getReseñasLibro, getReseñasUsuario, postReseña} from "../controllers/reseñas.controller.js";

const router = Router();

router.get("/resenaL/:id", getReseñasLibro);

router.get("/resenaU/:id", getReseñasUsuario);

router.post("/:id", [
    validateJWT,
    check('id', 'No es un Id de mongo válido').isMongoId(),
    validateDocuments
], postReseña);

export default router;