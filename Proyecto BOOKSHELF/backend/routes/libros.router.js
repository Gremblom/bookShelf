import express from "express";

import {getDatos, getOne, postDatos, updateDatos, delDatos} from "../controllers/libros.controller.js";

const router = express.Router();

router.get("/", getDatos);
router.get("/:id", getOne);
router.post("/", postDatos);
router.delete("/:id", delDatos);

export default router;