import { Request, Response } from "express"
import { PrescriptionQuerysModel } from "./models/prescriptionsQuerysModel";

export class PrescriptionsQuerysController{
    public static async getAllPrescriptionsByMedicines( req: Request, res: Response ): Promise<void> {
        const { medicamento_id } = req.params
        
        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByMedicineId(parseInt(medicamento_id))

            res.status(201).json({ message: _prescriptions})
        } catch (err) {
            res.status(404).json({ message: 'Prescriptions not found' });
        }
    }

    public static async getAllPrescriptionsByfrecuency( req: Request, res: Response ): Promise<void> {
        const { frecueny } = req.params

        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByFrecuency(frecueny)

            res.status(201).json({ message: _prescriptions})
        } catch (err) {
           res.status(404).json({ message: 'Prescriptions not found'}) 
        }
    }

    public static async getAllPrescriptionsByDuration( req: Request, res: Response ): Promise<void> {
        const { duration } = req.params
        const formatDate = new Date(duration).toISOString().split('T')[0]

        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByDuration(formatDate)

            res.status(201).json({ message: _prescriptions})
        } catch (err) {
           res.status(404).json({ message: 'Prescriptions not found'}) 
        }
    }
}