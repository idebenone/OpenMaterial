import zlib from 'zlib';
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Composition } from "../models/compositionModel";

import { RESPONSE } from "../utils/responses";

const getCompositions = async (req: Request, res: Response) => {
    try {
        const compositions = await Composition.findAll({ attributes: ["composition_id", "composition_name", "composition_description", "createdAt", "updatedAt"] });
        if (!compositions || compositions.length === 0) {
            return res.status(404).json(RESPONSE.NOT_FOUND());
        }

        return res.status(200).json(RESPONSE.OK("", compositions));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

const getComposition = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const composition = await Composition.findByPk(id);
        if (composition) {
            const decompressedChart = zlib.gunzipSync(composition.composition_chart).toString();
            return res.status(200).json(RESPONSE.OK("Composition fetched", { ...composition.toJSON(), chart: JSON.parse(decompressedChart) }));
        }
        if (!composition) return res.status(404).json(RESPONSE.NOT_FOUND());
    } catch (error) {
        return res.status(200).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

const createCompostion = async (req: Request, res: Response) => {
    const { composition_name, composition_description } = req.body;
    try {
        await Composition.create({ composition_id: uuidv4(), user_id: 1, composition_name, composition_description })
        return res.status(201).json(RESPONSE.CREATED());
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export { getCompositions, getComposition, createCompostion };