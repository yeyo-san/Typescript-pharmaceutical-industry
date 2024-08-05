import { pool } from "../config/db";
import { PatiensInterface } from "../interface/interfaces";

export class PatiensModel{
    public static async getPatients(): Promise<PatiensInterface[] | undefined> {
        const query = 'SELECT * FROM patients'

        try {
            const [ resolve ] = await pool.query(query);

            if(!resolve) {
                throw new Error('Patients not found')
            }

            return resolve as PatiensInterface[]
        } catch (err) {
            
        }
    }

    public static async getPatienById(id: number): Promise<PatiensInterface | undefined> {
        const query = 'SELECT * FROM patients WHERE id =?'
        
        try {
            const [ resolve ] = await pool.query(query, [id])

            if(Array.isArray(resolve) && resolve.length > 0) {
                return resolve[0] as PatiensInterface
            }else{
                console.error('Patient not found', id)
                return undefined
            }

        } catch (err) {
            console.error('Error', err)
            return undefined
        }
    }

    public static async insertPatien( patien: Omit<PatiensInterface, 'id'>): Promise<PatiensInterface | undefined> {
        try {
            const [ resolve ] = await pool.query(`INSERT INTO patients (name, age, medical_history) VALUES (?,?,?)`, [patien.name, patien.age, patien.medical_history])
        
            if(!resolve) {
                throw new Error('Cannot create patient')
            }

            const insertId = (resolve as any).insertId;

            return{
                ...patien,
                id: insertId
            }

        } catch (err) {
            console.log('Error: ', err)
        }
    }

    public static async updatePatient(patien: Omit<PatiensInterface, 'id'>, id: number): Promise<PatiensInterface | undefined> {
        try {
           const foundPatien = await this.getPatienById(id)

           if(!foundPatien){
                throw new Error('Patient not found')
           }

           const [ resolve ] = await pool.query(`UPDATE patients SET name = ?, age = ?, medical_history = ? WHERE id = ?`, [ patien.name, patien.age, patien.medical_history, foundPatien.id])
           
           if((resolve as any).affectedRows === 0){
                throw new Error('Cannot update patient')
           }

           const updatedPatien = await this.getPatienById(id)

           return updatedPatien
        } catch (err) {
            console.error('Error: ', err)
        }
    }

    public static async deletePatient(id: number): Promise<string | undefined> {
        try {
            const foundPatien = await this.getPatienById(id)

            if(!foundPatien){
                throw new Error('Patient not found')
            }

            await pool.query(`DELETE FROM patients WHERE id = ?`, [foundPatien.id])

            return 'Patient deleted successfully'
        }catch(err){
            console.error('Error: ', err)
        }
    }
}