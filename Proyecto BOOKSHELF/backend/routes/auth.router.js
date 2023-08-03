import {check} from "express-validator";
import {Router} from "express";

import login from "../controllers/auth.controller.js";
import validateDocuments from "../middlewares/validateDocuments.js";

const router = Router();

router.post("/login", [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateDocuments
], login);

export default router;