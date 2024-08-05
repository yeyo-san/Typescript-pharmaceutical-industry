import { Router } from "express";
import { PrescriptionsQuerysController } from "../data/prescriptionsQuerysController";
const prescriptionsQueryRouter = Router();
prescriptionsQueryRouter.get('/:medicamento_id', PrescriptionsQuerysController.getAllPrescriptionsByMedicines);
prescriptionsQueryRouter.get('/:frecuency', PrescriptionsQuerysController.getAllPrescriptionsByfrecuency);
prescriptionsQueryRouter.get('/:duration', PrescriptionsQuerysController.getAllPrescriptionsByDuration);
export default prescriptionsQueryRouter;
