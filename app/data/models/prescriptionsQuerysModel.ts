import { pool } from "../../config/db";
import { PrescriptionsInterface } from "../../interface/interfaces";

export class PrescriptionQuerysModel{
    public static async getPrescriptionsByMedicineId(medicamento_id: number): Promise<PrescriptionsInterface[] |  undefined> {
        const query = "SELECT * FROM prescriptions WHERE medicamento_id = ?"

        try {
            const [ resolve ] = await pool.query(query, [medicamento_id])

            if(!resolve){
                throw new Error('Non prescriptions found by that id')
            }

            return resolve as PrescriptionsInterface[]
        } catch (err) {
            console.error('Error: ', err)
        }
    }

    public static async getPrescriptionsByFrecuency(frecuency: string): Promise<PrescriptionsInterface[] |  undefined> {
        const query = "SELECT * FROM prescriptions WHERE frecuency = ?"

        try {
            const [ resolve ] = await pool.query(query, [frecuency])

            if(!resolve){
                throw new Error('Non prescriptions found by that frecuency')
            }

            return resolve as PrescriptionsInterface[]
        } catch (err) {
            console.error('Error: ', err)
        }
    }

    public static async getPrescriptionsByDuration(duration: string): Promise<PrescriptionsInterface[] |  undefined> {
        const query = "SELECT * FROM prescriptions WHERE duration = ?"

        try {
            const [ resolve ] = await pool.query(query, [duration])

            if(!resolve){
                throw new Error('Non prescriptions found by that duration')
            }

            return resolve as PrescriptionsInterface[]
        } catch (err) {
            console.error('Error: ', err)
        }
    }
}