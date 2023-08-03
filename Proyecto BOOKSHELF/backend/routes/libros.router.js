import express from "express";

import {getDatos, getOne, postDatos, updateDatos, delDatos} from "../controllers/libros.controller.js";

const router = express.Router();

router.get("/all", getDatos);
router.get("/one/:id", getOne);
router.post("/", [

], postDatos);
router.patch("/upd/:id", updateDatos);
router.delete("/del/:id", delDatos);

export default router;