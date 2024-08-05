import { pool } from "../config/db";
import { Medicines } from "../interface/interfaces";

export class MedicineModel {
    public static async getMedicines(): Promise<Medicines[] | undefined> {
        const query = 'SELECT * FROM medicines'

        try {
            const [resolve] = await pool.query(query);

            if(!resolve) {
                throw new Error('Cannot get medicines')
            }

            return resolve as Medicines[];
        } catch (err) {
            console.error('Error:', err)
        }
    }

    public static async getMedicineById(id: number): Promise<Medicines | undefined> {
        const query = 'SELECT * FROM medicines WHERE id =?'

        try {
            const [resolve] = await pool.query(query, [id])

            if(Array.isArray(resolve) && resolve.length > 0) {
                return resolve[0] as Medicines
            }else {
                console.error('Medicine not found', id)
                return undefined
            }

        } catch (err) {
            console.error('Error:', err)
            return undefined
        }
    }

    public static async createMedicine(medicine: Omit<Medicines, 'id'>): Promise<Medicines | undefined> {
        try {
            const [resolve] = await pool.query( `INSERT INTO medicines (name, quantity, expiration_date, price) VALUES (?, ?, ?, ?)`, [medicine.name, medicine.quantity, medicine.expiration_date, medicine.price])

            if(!resolve) {
                throw new Error('Cannot create medicine')
            }

            const insertId = (resolve as any).insertedId;

            return{
                ...medicine,
                id: insertId,
            }
        } catch (err) {
            console.error('Error: ', err)
        }
    }

    public static async updateMedicineModel(medicine: Omit<Medicines, 'id'>, id: number): Promise<Medicines | undefined> {
        try {
            const foundMedicine = await this.getMedicineById(id);

            if(!foundMedicine) {
                throw new Error('Medicine not found')
            }

            const [ resolve ] = await pool.query(`UPDATE medicines SET name = ?, quantity = ?, expiration_date = ?, price = ? WHERE id = ?`, [medicine.name, medicine.quantity, medicine.expiration_date, medicine.price, foundMedicine.id])
            
            if((resolve as any).affectedRows === 0) {
                throw new Error('Cannot update medicine')
            }
            
            const updatedMedicine = await this.getMedicineById(id)

            return updatedMedicine
        } catch (err) {
            console.error(err)
        }
    }

    public static async deleteMedicineModel(id: number): Promise<String | undefined>{
        try {
            const foundMedicine = await this.getMedicineById(id)
      
            if(!foundMedicine) {
                throw new Error('Medicine not found')
            }

            await pool.query(`DELETE FROM medicines WHERE id =?`, [foundMedicine.id])

            return 'Medicine deleted successfully'
        } catch (err) {
            console.error('Error:', err)
        }
    }
}