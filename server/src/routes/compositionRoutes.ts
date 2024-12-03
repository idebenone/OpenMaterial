import express, { Request, Response } from "express";
import { createCompostion, getComposition, getCompositions } from "../services/compositionServices";

const COMPOSITION = express();

COMPOSITION.get("/", async (req: Request, res: Response) => {
    await getCompositions(req, res);
})

COMPOSITION.get("/:id", async (req: Request, res: Response) => {
    await getComposition(req, res)
})

COMPOSITION.post("/", async (req: Request, res: Response) => {
    await createCompostion(req, res);
})

export default COMPOSITION;