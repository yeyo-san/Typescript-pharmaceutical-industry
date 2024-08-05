import { Router } from "express";
import { PatiensController } from "../controllers/patiensController.js";
const patientsRouter = Router();
patientsRouter.get('/', PatiensController.getPatients);
patientsRouter.post('/', PatiensController.insertPatien);
patientsRouter.put('/:id', PatiensController.updatePatient);
patientsRouter.delete('/:id', PatiensController.deletePatient);
export default patientsRouter;
