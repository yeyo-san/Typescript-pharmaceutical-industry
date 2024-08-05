import { Router } from "express";
import { PrescriptionsController } from "../controllers/prescriptionsCntroller.js";
const prescriptionsRouter = Router();
prescriptionsRouter.get('/', PrescriptionsController.getPrescriptions);
prescriptionsRouter.post('/', PrescriptionsController.insertPrescription);
prescriptionsRouter.put('/:id', PrescriptionsController.updatePrescription);
prescriptionsRouter.delete('/:id', PrescriptionsController.deletePrescription);
export default prescriptionsRouter;
