import {Router} from "express";

import validateDocuments from "../middlewares/validateDocuments.js";
import validateJWT from "../middlewares/validateJWT.js";
import uploadFile from "../controllers/upload.controller.js";

const router = Router();

router.post("/", [
    validateJWT,
    validateDocuments
], uploadFile);

export default router;