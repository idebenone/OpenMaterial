import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME || "test", process.env.DB_USER || "postgres", process.env.DB_PASS || "secretpass", {
    host: process.env.DB_HOST || "localhost", dialect: 'postgres'
})


export default sequelize;