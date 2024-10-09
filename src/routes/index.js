import { Router } from "express";
import usersRouter from "./users.router.js"
import petsRouter from "./pets.router.js"
import adoptionRouter from "./adoption.router.js";
import sessionRouter from "./sessions.router.js";
import mocksRouter from "./mock.router.js"

const router = Router();

router.use("/users", usersRouter);
router.use("/pets", petsRouter);
router.use("/adoptions", adoptionRouter);
router.use("/sessions", sessionRouter);
router.use("/mocks", mocksRouter);

export default router;