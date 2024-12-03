import dotenv from "dotenv";
dotenv.config();

import express, { Express } from 'express';
import morgan from "morgan";
import sequelize from './config/pgConnection';
import cors from "cors";
import GEMINI from './routes/geminiRoutes';
import COMPOSITION from "./routes/compositionRoutes";
import WORKSPACE from "./routes/workspaceRoutes";
const app: Express = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
    console.log("⚡ | Database connection successful")

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`⚡ | Server is running at http://localhost:${process.env.SERVER_PORT}`);
    })
}).catch((error) => console.log("Something went wrong \n", error))

app.use("/api/composition", COMPOSITION);
app.use("/api/gemini", GEMINI)
app.use("/api/workspace", WORKSPACE)