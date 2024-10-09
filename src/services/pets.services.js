import Pets from "../dao/Pets.dao.js";
import { customError } from "../errors/custom.error.js";

export class PetsServices {
    constructor() {
        this.petDao = new Pets();
    }
    async getAll() {
    
        const pets = await this.petDao.get();
        
        return pets;
    }
    async getById(id) {
        const pet = await this.petDao.getBy(id);
        if (!pet) throw customError.notFoundError(`User id ${id} not found`);
        return pet;
    }
    async create(data) {
        const pet = await this.petDao.save(data);
        return pet;
    }
    async update(id, data) {
        const pet = await this.petDao.update(id, data);
        return pet;
    }
    async remove(id) {
        await this.petDao.delete(id);
        return "ok";
    }
    async createMany(data) {
        
        const pets = await this.petDao.saveMany(data);
        
        return pets;
    }
}
