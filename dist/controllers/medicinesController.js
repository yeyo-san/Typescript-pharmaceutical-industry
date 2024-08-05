import { MedicineModel } from "../models/medicineModel.js";
export class MedicineController {
    static async getMedicines(req, res) {
        try {
            const medicines = await MedicineModel.getMedicines();
            res.status(201).json({ message: medicines });
        }
        catch (err) {
            res.status(404).json({ message: 'Medicines not found' });
        }
    }
    static async insertMedicine(req, res) {
        const { name, quantity, expiration_date, price } = req.body;
        const newMedicine = { name, quantity, expiration_date, price };
        try {
            const createMedicine = await MedicineModel.createMedicine(newMedicine);
            res.status(201).json({ message: 'Medicine inserted successfully', data: createMedicine });
        }
        catch (err) {
            res.status(500).json({ message: 'Error inserting medicine' });
        }
    }
    static async updateMedicine(req, res) {
        const { id } = req.params;
        const { name, quantity, expiration_date, price } = req.body;
        const updateMedicine = { name, quantity, expiration_date, price };
        try {
            const medicineUpdate = await MedicineModel.updateMedicineModel(updateMedicine, parseInt(id));
            res.status(201).json({ message: 'Updated medicine successfully', data: medicineUpdate });
        }
        catch (err) {
            res.status(500).json({ message: 'Error updating' });
        }
    }
    static async deleteMedicine(req, res) {
        const { id } = req.params;
        try {
            const deletedMedicine = await MedicineModel.deleteMedicineModel(parseInt(id));
            if (!deletedMedicine) {
                res.status(404).json({ message: 'Medicine not found' });
            }
            res.status(201).json({ message: 'Medicine deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: 'Error deleting medicine' });
        }
    }
}
