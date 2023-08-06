import {check, body} from "express-validator";
import {Router} from "express";

import {login, verify} from "../controllers/auth.controller.js";
import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import {correoValido, contraseñaValida} from "../helpers/db.validators.js";

const router = Router();

router.post("/login", [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email').custom(correoValido),
    body('password').custom(contraseñaValida),
    validateDocuments
], login);

router.post("/verify", [
    validateJWT,
    validateDocuments
], verify);

export default router;