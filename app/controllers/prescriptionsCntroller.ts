import { Request, Response } from "express";
import { PrescriptionsInterface } from "../interface/interfaces";
import { PrescriptionsModel } from "../models/prescriptionsModel";

export class PrescriptionsController{
    public static async getPrescriptions(req: Request, res: Response): Promise<void> {
        try {
            const foundPatients = await PrescriptionsModel.getPrescriptions()

            res.status(201).json({ message: foundPatients})
        } catch (err) {
            res.status(404).json({ message: err})
        }
    }

    public static async insertPrescription( req: Request, res: Response): Promise<void> {
        const { medicamento_id, dosage, frecuency, duration } = req.body
        const newPrescription: Omit<PrescriptionsInterface, 'id'> = { medicamento_id, dosage, frecuency, duration }

        try {
            const createdPrescription = await PrescriptionsModel.insertPrescription(newPrescription)

            res.status(201).json({ message: 'Prescription inserted successfully', data: createdPrescription })
        } catch (err) {
            res.status(404).json({ message: 'Error inserting prescription' })
        }
    }

    public static async updatePrescription( req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { medicamento_id, dosage, frecuency, duration } = req.body

        const newUpdatePrescription: Omit<PrescriptionsInterface, 'id'> = { medicamento_id, dosage, frecuency, duration}
        
        try {
            const update = await PrescriptionsModel.updatePrescription(newUpdatePrescription, parseInt(id))
            
            res.status(201).json({ message: 'Prescription medicine successfully', data: update})
        } catch (err) {
            res.status(500).json({ message: 'Error updating prescription' })
        }
    }

    public static async deletePrescription( req: Request, res: Response): Promise<void>{
        const { id } = req.params 

        try {
            const deletedPrescription = await PrescriptionsModel.deletePrepscription(parseInt(id))

            if(!deletedPrescription){
                res.status(404).json({ message: 'Prescription not found'})
            }
            
            res.status(201).json({ message: 'Prescription deleted successfully'})
        } catch (err) {
            res.status(500).json({ message: 'Error deleting prescription'})
        }
    }
}