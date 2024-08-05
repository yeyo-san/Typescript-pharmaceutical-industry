import { PrescriptionsModel } from "../models/prescriptionsModel.js";
export class PrescriptionsController {
    static async getPrescriptions(req, res) {
        try {
            const foundPatients = await PrescriptionsModel.getPrescriptions();
            res.status(201).json({ message: foundPatients });
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    }
    static async insertPrescription(req, res) {
        const { medicamento_id, dosage, frecuency, duration } = req.body;
        const newPrescription = { medicamento_id, dosage, frecuency, duration };
        try {
            const createdPrescription = await PrescriptionsModel.insertPrescription(newPrescription);
            res.status(201).json({ message: 'Prescription inserted successfully', data: createdPrescription });
        }
        catch (err) {
            res.status(404).json({ message: 'Error inserting prescription' });
        }
    }
    static async updatePrescription(req, res) {
        const { id } = req.params;
        const { medicamento_id, dosage, frecuency, duration } = req.body;
        const newUpdatePrescription = { medicamento_id, dosage, frecuency, duration };
        try {
            const update = await PrescriptionsModel.updatePrescription(newUpdatePrescription, parseInt(id));
            res.status(201).json({ message: 'Prescription medicine successfully', data: update });
        }
        catch (err) {
            res.status(500).json({ message: 'Error updating prescription' });
        }
    }
    static async deletePrescription(req, res) {
        const { id } = req.params;
        try {
            const deletedPrescription = await PrescriptionsModel.deletePrepscription(parseInt(id));
            if (!deletedPrescription) {
                res.status(404).json({ message: 'Prescription not found' });
            }
            res.status(201).json({ message: 'Prescription deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: 'Error deleting prescription' });
        }
    }
}
