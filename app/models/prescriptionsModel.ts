import { pool } from "../config/db";
import { PrescriptionsInterface } from "../interface/interfaces";
import { MedicineModel } from "./medicineModel";

export class PrescriptionsModel{
    public static async getPrescriptions(): Promise<PrescriptionsInterface[] | undefined> {
        const query = 'SELECT * FROM prescriptions'

        try {
            const [ resolve ] = await pool.query(query);

            if(!resolve) {
                throw new Error('Prescriptions not found')
            }

            return resolve as PrescriptionsInterface[]
        } catch (err) {
            
        }
    }

    public static async getPatienById(id: number): Promise<PrescriptionsInterface | undefined> {
        const query = 'SELECT * FROM prescriptions WHERE id =?'
        
        try {
            const [ resolve ] = await pool.query(query, [id])

            if(Array.isArray(resolve) && resolve.length > 0) {
                return resolve[0] as PrescriptionsInterface
            }else{
                console.error('prescription not found', id)
                return undefined
            }

        } catch (err) {
            console.error('Error', err)
            return undefined
        }
    }

    public static async insertPrescription( prescription: Omit<PrescriptionsInterface, 'id'>): Promise<PrescriptionsInterface | undefined> {
        try {
            const medicineFound = await MedicineModel.getMedicineById(prescription.medicamento_id);

            if(!medicineFound){
                throw new Error('Medicine not found')
            }
            
            const [ resolve ] = await pool.query(`INSERT INTO prescriptions (medicamento_id, dosage, frecuency, duration) VALUES (?,?,?,?)`, [medicineFound.id, prescription.dosage, prescription.frecuency, prescription.duration])
        
            if(!resolve) {
                throw new Error('Cannot create prescription')
            }

            const insertId = (resolve as any).insertId;

            return{
                ...prescription,
                id: insertId
            }

        } catch (err) {
            console.log('Error: ', err)
        }
    }

    public static async updatePrescription(prescription: Omit<PrescriptionsInterface, 'id'>, id: number): Promise<PrescriptionsInterface | undefined>{
        try {
            const foundPrescription = await this.getPatienById(id)

            if(!foundPrescription){
                throw new Error('Prescription not found')
            }

            const medicineFound = await MedicineModel.getMedicineById(prescription.medicamento_id)

            if(!medicineFound){
                throw new Error('Medicine not found')
            }

            const [ resolve ] = await pool.query('UPDATE prescriptions SET medicamento_id = ?, dosage = ?, frecuency = ?, duration = ? WHERE id = ?', [ medicineFound.id, prescription.dosage, prescription.frecuency, prescription.duration, foundPrescription.id])
        
            if((resolve as any).affectedRows === 0){
                throw new Error('Cannot update patient')
           }

           const updatedPrescription = await this.getPatienById(id)

           return updatedPrescription
        }catch (err) {
            console.error('Error: ', err)
        }
    }

    public static async deletePrepscription(id: number): Promise<string | undefined> {
        try {
            const foundPrescription = await this.getPatienById(id)

            if(!foundPrescription){
                throw new Error('prescription not found')
            }

            await pool.query(`DELETE FROM prescriptions WHERE id = ?`, [foundPrescription.id])

            return 'prescription deleted successfully'
        }catch(err){
            console.error('Error: ', err)
        }
    }
}