import express, { Request, Response } from "express";
import { generateDummyMap, generateMap } from "../services/geminiServices";

const GEMINI = express();

GEMINI.post("/generate-map", async (req: Request, res: Response) => {
    await generateMap(req, res);
})

GEMINI.post("/generate-dummy", async (req: Request, res: Response) => {
    await generateDummyMap(req, res);
})

export default GEMINI;