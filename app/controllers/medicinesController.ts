import { Request, Response } from "express";
import { MedicineModel } from "../models/medicineModel";
import { Medicines } from "../interface/interfaces";

export class MedicineController{
    public static async getMedicines( req: Request, res: Response): Promise<void> {
        try {
            const medicines = await MedicineModel.getMedicines()

            res.status(201).json({ message: medicines})
        } catch (err) {
            res.status(404).json({ message: 'Medicines not found' });
        }
    }

    public static async insertMedicine( req: Request, res: Response): Promise<void> {
        const { name, quantity, expiration_date, price } = req.body
        const newMedicine: Omit<Medicines, 'id'> = { name, quantity, expiration_date, price }

        try {
            const createMedicine = await MedicineModel.createMedicine(newMedicine)

            res.status(201).json({ message: 'Medicine inserted successfully', data: createMedicine});
        } catch (err) {
            res.status(500).json({ message: 'Error inserting medicine' });
        }
    }

    public static async updateMedicine( req: Request, res: Response): Promise<void>{
        const { id } = req.params
        const { name, quantity, expiration_date, price } = req.body

        const updateMedicine: Omit<Medicines, 'id'> = { name, quantity, expiration_date, price }

        try {
            const medicineUpdate = await MedicineModel.updateMedicineModel(updateMedicine, parseInt(id))

            res.status(201).json({ message: 'Updated medicine successfully', data: medicineUpdate})
        } catch (err) {
            res.status(500).json({ message: 'Error updating'})
        }
    }

    public static async deleteMedicine(req: Request, res: Response): Promise<void>{
        const { id } = req.params
        try {
            const deletedMedicine = await MedicineModel.deleteMedicineModel(parseInt(id));

            if (!deletedMedicine) {
                res.status(404).json({ message: 'Medicine not found' })
            }

            res.status(201).json({ message: 'Medicine deleted successfully'})
        } catch (err) {
            res.status(500).json({ message: 'Error deleting medicine' })
        }
    }

}