import { Router } from "express";
import { MedicineController } from "../controllers/medicinesController.js";
const medicineRouter = Router();
medicineRouter.get('/', MedicineController.getMedicines);
medicineRouter.post('/', MedicineController.insertMedicine);
medicineRouter.put('/:id', MedicineController.updateMedicine);
medicineRouter.delete('/:id', MedicineController.deleteMedicine);
export default medicineRouter;
