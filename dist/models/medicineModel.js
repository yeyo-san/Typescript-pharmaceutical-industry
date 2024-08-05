import { pool } from "../config/db.js";
export class MedicineModel {
    static async getMedicines() {
        const query = 'SELECT * FROM medicines';
        try {
            const [resolve] = await pool.query(query);
            if (!resolve) {
                throw new Error('Cannot get medicines');
            }
            return resolve;
        }
        catch (err) {
            console.error('Error:', err);
        }
    }
    static async getMedicineById(id) {
        const query = 'SELECT * FROM medicines WHERE id =?';
        try {
            const [resolve] = await pool.query(query, [id]);
            if (Array.isArray(resolve) && resolve.length > 0) {
                return resolve[0];
            }
            else {
                console.error('Medicine not found', id);
                return undefined;
            }
        }
        catch (err) {
            console.error('Error:', err);
            return undefined;
        }
    }
    static async createMedicine(medicine) {
        try {
            const [resolve] = await pool.query(`INSERT INTO medicines (name, quantity, expiration_date, price) VALUES (?, ?, ?, ?)`, [medicine.name, medicine.quantity, medicine.expiration_date, medicine.price]);
            if (!resolve) {
                throw new Error('Cannot create medicine');
            }
            const insertId = resolve.insertedId;
            return {
                ...medicine,
                id: insertId,
            };
        }
        catch (err) {
            console.error('Error: ', err);
        }
    }
    static async updateMedicineModel(medicine, id) {
        try {
            const foundMedicine = await this.getMedicineById(id);
            if (!foundMedicine) {
                throw new Error('Medicine not found');
            }
            const [resolve] = await pool.query(`UPDATE medicines SET name = ?, quantity = ?, expiration_date = ?, price = ? WHERE id = ?`, [medicine.name, medicine.quantity, medicine.expiration_date, medicine.price, foundMedicine.id]);
            if (resolve.affectedRows === 0) {
                throw new Error('Cannot update medicine');
            }
            const updatedMedicine = await this.getMedicineById(id);
            return updatedMedicine;
        }
        catch (err) {
            console.error(err);
        }
    }
    static async deleteMedicineModel(id) {
        try {
            const foundMedicine = await this.getMedicineById(id);
            if (!foundMedicine) {
                throw new Error('Medicine not found');
            }
            await pool.query(`DELETE FROM medicines WHERE id =?`, [foundMedicine.id]);
            return 'Medicine deleted successfully';
        }
        catch (err) {
            console.error('Error:', err);
        }
    }
}
