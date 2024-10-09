import { Router } from "express";
import { generateUsersMock } from "../mocks/user.mock.js";
import { UserServices } from "../services/user.services.js";
import { generatePetsMock } from "../mocks/pets.mock.js";
import { PetsServices } from "../services/pets.services.js";

const userServices = new UserServices()
const petsServices = new PetsServices()

const router = Router();

router.get("/mockingpets", async (req, res) => {
    const pets = generatePetsMock(50);
    const response = await petsServices.createMany(pets)
    res.status(201).json({ status: "ok", payload: response })
});


router.get("/mockingusers", async (req, res) => {
    const users = generateUsersMock(50);
    const response = await userServices.createMany(users)
    res.status(201).json({ status: "ok", payload: response })
});

router.get("/generateData/:cu/:cp", async (req, res) => {

    const { cu, cp } = req.params;

    const users = generateUsersMock(cu);
    const pets = generatePetsMock(cp);
    const usersResponse = await userServices.createMany(users);
    const petsResponse = await petsServices.createMany(pets);
    res.status(201).json({ status: "ok", payload: { petsResponse, usersResponse } })
})

export default router;