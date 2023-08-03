import {Router} from "express";
import {check} from "express-validator";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import favoritoExists from "../middlewares/validateFavorito.js";
import {postFavorito} from "../controllers/favoritos.controller.js";

const router = Router();

router.post("/", [
    validateJWT,
    favoritoExists,
    validateDocuments
], postFavorito)

export default router;