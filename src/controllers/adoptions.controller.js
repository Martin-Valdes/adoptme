// import { adoptionsService,petsService } from "../services/index.js"
import { UserServices } from "../services/user.services.js";
import { AdoptionServices } from "../services/adoptions.services.js";
import { PetsServices } from "../services/pets.services.js";

const usersService = new UserServices();
const petsService = new PetsServices();


export class AdoptionControllers {
    constructor() {
        this.adoptionsService = new AdoptionServices();
    }
    
    getAllAdoptions = async(req,res)=>{
        const result = await this.adoptionsService.getAll();
        res.send({status:"success",payload:result})
    }
    
    getAdoption = async(req,res, next)=>{
        try {
            
            const adoptionId = req.params.aid;
            const adoption = await this.adoptionsService.getById({_id:adoptionId})
            if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
            res.send({status:"success",payload:adoption})
        } catch (error) {
            next(error)
        }
    }
    
    createAdoption = async(req,res, next)=>{
        try {
            
            const {uid,pid} = req.params;
            
            const user = await usersService.getById(uid);
           
            if(!user) return res.status(404).send({status:"error", error:"user Not found"});
            const pet = await petsService.getById({_id:pid});
            if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
            if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
            user.pets.push(pet._id);
            await usersService.update(user._id,{pets:user.pets})
            await petsService.update(pet._id,{adopted:true,owner:user._id})
            await this.adoptionsService.create({owner:user._id,pet:pet._id})
            res.send({status:"success",message:"Pet adopted"})
        } catch (error) {
            next(error)
        }
    }
}
