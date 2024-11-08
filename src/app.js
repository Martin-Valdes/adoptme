import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import router from "./routes/index.js";
import { specs } from "./config/swagger.config.js";

const app = express();

const PORT = process.env.PORT || 8080;
mongoose.set('strictQuery', true);

const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api", router);

app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`) );
