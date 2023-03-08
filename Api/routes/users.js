import express  from "express";
import { pegarCliente,adicionarCliente,  atualizarCliente, deletarCliente } from "../controllers/user.js"

const router = express.Router()

router.get("/", pegarCliente)

router.post("/", adicionarCliente)

router.put("/:id", atualizarCliente)

router.delete("/:id", deletarCliente)

export default router
