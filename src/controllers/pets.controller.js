import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import { PetsServices } from "../services/pets.services.js";

export class PetsControllers {
    constructor() {
        this.petService = new PetsServices();
    }

    createPetsMock = async (req, res) => {
        const Pets = await this.petService.createPetMocks()
        res.status(201).json({ status: "ok", Pets });
    };

    getAllPets = async (req, res, next) => {
        try {
            const pets = await this.petService.getAll();
            res.status(200).json({ status: "success", payload: pets })
        } catch (error) {
            next(error)
        }
    }

    createPet = async (req, res) => {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
        const pet = await this.petService.create({ name, specie, birthDate });
        res.status(201).json({ status: "success", payload: pet })
    }

    getPet = async (req, res, next) => {
        try {
            const petId = req.params.pid;
            const pet = await this.petService.getById(petId);
            res.send({ status: "success", payload: pet });
        } catch (error) {
            console.log(`Error: ${error.message}`);
            next(error);
        }
    };

    updatePet = async (req, res) => {
        const petUpdate = req.body;
        const petId = req.params.pid;
        const result = await this.petService.update(petId, petUpdate);
        res.send({ status: "success", payload: result })
    }

    deletePet = async (req, res) => {
        const petId = req.params.pid;
        const result = await this.petService.remove(petId);
        res.send({ status: "success", message: "pet deleted" });
    }

    createPetWithImage = async (req, res) => {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
        console.log(file);
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });
        console.log(pet);
        const result = await petsService.create(pet);
        res.send({ status: "success", payload: result })
    }
}

