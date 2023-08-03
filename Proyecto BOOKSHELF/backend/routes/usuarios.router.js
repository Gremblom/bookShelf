import {Router} from "express";
import {check} from "express-validator";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import isAdmin from "../middlewares/validate.rol.js";
import {deleteUsuario, getUsuarios, postUsuarios, updatePassword, updateUsuario} from "../controllers/usuarios.controller.js";
import {existeEmail, isValidRol, usuarioExiste} from "../helpers/db.validators.js";

const router = Router();

router.get("/", getUsuarios);

router.post("/", [
    check('usuario', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Debe tener minimo 6 caracteres').isLength({min : 6}),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(existeEmail),
    check('rol').custom(isValidRol),
    validateDocuments
], postUsuarios);

router.delete("/:id", [
    validateJWT,
    isAdmin,
    check('id', 'No es una id válida').isMongoId(),
    check('id').custom(usuarioExiste),
    validateDocuments
], deleteUsuario);

router.put("/:id", [
    validateJWT,
    check('id', 'No es una id válida').isMongoId(),
    check('id').custom(usuarioExiste),
    validateDocuments
], updateUsuario);

router.patch("/:id", [
    validateJWT,
    check('id', 'No es una id válida').isMongoId(),
    check('id').custom(usuarioExiste),
    validateDocuments
], updatePassword);

export default router;