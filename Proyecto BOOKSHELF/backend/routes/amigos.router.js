import {Router} from "express";
import {check, body} from "express-validator";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import friendShipExists from "../middlewares/validateFriendship.js";
import {amistadExiste} from "../helpers/db.validators.js";
import {deleteAmistad, getAmigos, newAmistad} from "../controllers/amigos.controller.js";

const router = Router();

router.get("/:id", getAmigos);

router.post("/", [
    validateJWT,
    check('usuario2', 'No es un Id de mongo válido').isMongoId(),
    friendShipExists,
    validateDocuments
], newAmistad);

router.delete("/:id", [
    validateJWT,
    check('id').custom(amistadExiste),
    validateDocuments
], deleteAmistad);

export default router;