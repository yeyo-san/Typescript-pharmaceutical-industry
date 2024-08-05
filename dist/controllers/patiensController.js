import { PatiensModel } from "../models/patienModel.js";
export class PatiensController {
    static async getPatients(req, res) {
        try {
            const foundPatients = await PatiensModel.getPatients();
            res.status(201).json({ message: foundPatients });
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    }
    static async insertPatien(req, res) {
        const { name, age, medical_history } = req.body;
        const newPatient = { name, age, medical_history };
        try {
            const createdPatient = await PatiensModel.insertPatien(newPatient);
            res.status(201).json({ message: 'Patiens inserted successfully', data: createdPatient });
        }
        catch (err) {
            res.status(404).json({ message: 'Error inserting patient' });
        }
    }
    static async updatePatient(req, res) {
        const { id } = req.params;
        const { name, age, medical_history } = req.body;
        const newUpdatePatient = { name, age, medical_history };
        try {
            const update = await PatiensModel.updatePatient(newUpdatePatient, parseInt(id));
            res.status(201).json({ message: 'Updated medicine successfully', data: update });
        }
        catch (err) {
            res.status(500).json({ message: 'Error updating patient' });
        }
    }
    static async deletePatient(req, res) {
        const { id } = req.params;
        try {
            const deletedPatient = await PatiensModel.deletePatient(parseInt(id));
            if (!deletedPatient) {
                res.status(404).json({ message: 'Patient not found' });
            }
            res.status(201).json({ message: 'Patient deleted successfully' });
        }
        catch (err) {
            res.status(500).json({ message: 'Error deleting patient' });
        }
    }
}
