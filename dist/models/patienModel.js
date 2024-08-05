import { pool } from "../config/db.js";
export class PatiensModel {
    static async getPatients() {
        const query = 'SELECT * FROM patients';
        try {
            const [resolve] = await pool.query(query);
            if (!resolve) {
                throw new Error('Patients not found');
            }
            return resolve;
        }
        catch (err) {
        }
    }
    static async getPatienById(id) {
        const query = 'SELECT * FROM patients WHERE id =?';
        try {
            const [resolve] = await pool.query(query, [id]);
            if (Array.isArray(resolve) && resolve.length > 0) {
                return resolve[0];
            }
            else {
                console.error('Patient not found', id);
                return undefined;
            }
        }
        catch (err) {
            console.error('Error', err);
            return undefined;
        }
    }
    static async insertPatien(patien) {
        try {
            const [resolve] = await pool.query(`INSERT INTO patients (name, age, medical_history) VALUES (?,?,?)`, [patien.name, patien.age, patien.medical_history]);
            if (!resolve) {
                throw new Error('Cannot create patient');
            }
            const insertId = resolve.insertId;
            return {
                ...patien,
                id: insertId
            };
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    static async updatePatient(patien, id) {
        try {
            const foundPatien = await this.getPatienById(id);
            if (!foundPatien) {
                throw new Error('Patient not found');
            }
            const [resolve] = await pool.query(`UPDATE patients SET name = ?, age = ?, medical_history = ? WHERE id = ?`, [patien.name, patien.age, patien.medical_history, foundPatien.id]);
            if (resolve.affectedRows === 0) {
                throw new Error('Cannot update patient');
            }
            const updatedPatien = await this.getPatienById(id);
            return updatedPatien;
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
    static async deletePatient(id) {
        try {
            const foundPatien = await this.getPatienById(id);
            if (!foundPatien) {
                throw new Error('Patient not found');
            }
            await pool.query(`DELETE FROM patients WHERE id = ?`, [foundPatien.id]);
            return 'Patient deleted successfully';
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
}
