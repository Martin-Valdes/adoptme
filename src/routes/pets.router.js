import { Router } from 'express';
import { PetsControllers } from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const petsController = new PetsControllers();
const router = Router();

router.get('/',petsController.getAllPets);
router.get("/mock", petsController.createPetsMock);
router.post("/", petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

export default router;