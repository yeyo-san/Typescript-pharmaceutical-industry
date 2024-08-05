import { PrescriptionQuerysModel } from "./models/prescriptionsQuerysModel";
export class PrescriptionsQuerysController {
    static async getAllPrescriptionsByMedicines(req, res) {
        const { medicamento_id } = req.params;
        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByMedicineId(parseInt(medicamento_id));
            res.status(201).json({ message: _prescriptions });
        }
        catch (err) {
            res.status(404).json({ message: 'Prescriptions not found' });
        }
    }
    static async getAllPrescriptionsByfrecuency(req, res) {
        const { frecueny } = req.params;
        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByFrecuency(frecueny);
            res.status(201).json({ message: _prescriptions });
        }
        catch (err) {
            res.status(404).json({ message: 'Prescriptions not found' });
        }
    }
    static async getAllPrescriptionsByDuration(req, res) {
        const { duration } = req.params;
        const formatDate = new Date(duration).toISOString().split('T')[0];
        try {
            const _prescriptions = await PrescriptionQuerysModel.getPrescriptionsByDuration(formatDate);
            res.status(201).json({ message: _prescriptions });
        }
        catch (err) {
            res.status(404).json({ message: 'Prescriptions not found' });
        }
    }
}
