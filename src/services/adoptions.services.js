import Adoption from "../dao/Adoption.dao.js";
import { customError } from "../errors/custom.error.js";

export class AdoptionServices {
    constructor() {
        this.adoptionsDao = new Adoption();
    }
    async getAll() {

        const adoptions = await this.adoptionsDao.get();

        return adoptions;
    }
    async getById(id) {
        const adoption = await this.adoptionsDao.getBy(id);
        if (!adoption) throw customError.notFoundError(`User id ${id} not found`);
        return adoption;
    }
    async create(data) {
        const adoption = await this.adoptionsDao.save(data);
        return adoption;
    }
    async update(id, data) {
        const adoption = await this.adoptionsDao.update(id, data);
        return adoption;
    }
    async remove(id) {
        await this.adoptionsDao.delete(id);
        return "ok";
    }
}