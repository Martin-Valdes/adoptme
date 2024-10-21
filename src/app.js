import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";

import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8081;
mongoose.set('strictQuery', true);
const connection = mongoose.connect(`mongodb://mongo/mydb`);


app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`) );
