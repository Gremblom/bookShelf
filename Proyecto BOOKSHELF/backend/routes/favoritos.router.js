import {Router} from "express";
import {check} from "express-validator";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import favoritoExists from "../middlewares/validateFavorito.js";
import {favoritoExiste} from "../helpers/db.validators.js";
import {postFavorito, getFavoritos, deleteFavorito} from "../controllers/favoritos.controller.js";

const router = Router();

router.get("/:id", [
    check('id', 'No es un Id de mongo válido').isMongoId(),
    validateDocuments
], getFavoritos);

router.post("/", [
    validateJWT,
    favoritoExists,
    validateDocuments
], postFavorito)

router.delete("/:id", [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un Id válido de mongo').isMongoId(),
    check('id').custom(favoritoExiste),
    validateDocuments
], deleteFavorito);

export default router;