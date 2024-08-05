import { pool } from "../../config/db";
export class PrescriptionQuerysModel {
    static async getPrescriptionsByMedicineId(medicamento_id) {
        const query = "SELECT * FROM prescriptions WHERE medicamento_id = ?";
        try {
            const [resolve] = await pool.query(query, [medicamento_id]);
            if (!resolve) {
                throw new Error('Non prescriptions found by that id');
            }
            return resolve;
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
    static async getPrescriptionsByFrecuency(frecuency) {
        const query = "SELECT * FROM prescriptions WHERE frecuency = ?";
        try {
            const [resolve] = await pool.query(query, [frecuency]);
            if (!resolve) {
                throw new Error('Non prescriptions found by that frecuency');
            }
            return resolve;
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
    static async getPrescriptionsByDuration(duration) {
        const query = "SELECT * FROM prescriptions WHERE duration = ?";
        try {
            const [resolve] = await pool.query(query, [duration]);
            if (!resolve) {
                throw new Error('Non prescriptions found by that duration');
            }
            return resolve;
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
}
