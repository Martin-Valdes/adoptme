import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import { PetsServices } from "../services/pets.services.js";

export class PetsControllers {
    constructor() {
        this.petService = new PetsServices();
    }

    createPetsMock = async (req, res, next) => {
        try {
            const Pets = await this.petService.createPetMocks()
            res.status(201).json({ status: "ok", Pets });
        } catch (error) {
            next(error)
        }
    };

    getAllPets = async (req, res, next) => {
        try {
            const pets = await this.petService.getAll();
            res.status(200).json({ status: "success", payload: pets })
        } catch (error) {
            next(error)
        }
    }

    createPet = async (req, res, next) => {
        try {
            const { name, specie, birthDate } = req.body;
            if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
            const pet = await this.petService.create({ name, specie, birthDate });
        
            res.status(201).json({ status: "success", payload: pet })
            
        } catch (error) {
            next(error)
        }
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

    updatePet = async (req, res, next) => {
        try {
            const petUpdate = req.body;
            const petId = req.params.pid;
            const result = await this.petService.update(petId, petUpdate);
            res.send({ status: "success", payload: result })
            
        } catch (error) {
            next(error)
        }
    }

    deletePet = async (req, res, next) => {
        try {
            const petId = req.params.pid;
            const result = await this.petService.remove(petId);
            res.send({ status: "success", message: "pet deleted" });
            
        } catch (error) {
            next(error)
        }
    }

    createPetWithImage = async (req, res) => {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" })
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });
        const result = await petsService.create(pet);
        res.send({ status: "success", payload: result })
    }
}

