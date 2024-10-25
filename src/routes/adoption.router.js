import { Router} from 'express';
import {AdoptionControllers} from '../controllers/adoptions.controller.js';

const adoptionsController = new AdoptionControllers();
const router = Router();

router.get('/',adoptionsController.getAllAdoptions);
router.get('/:aid',adoptionsController.getAdoption);
router.post('/:uid/:pid',adoptionsController.createAdoption);
router.delete('/:aid', adoptionsController.deleteAdoption);

export default router;