import { Request, Response } from "express";
import { PatiensInterface } from "../interface/interfaces";
import { PatiensModel } from "../models/patienModel";

export class PatiensController{
    public static async getPatients(req: Request, res: Response): Promise<void> {
        try {
            const foundPatients = await PatiensModel.getPatients()

            res.status(201).json({ message: foundPatients})
        } catch (err) {
            res.status(404).json({ message: err})
        }
    }

    public static async insertPatien( req: Request, res: Response): Promise<void> {
        const { name, age, medical_history } = req.body
        const newPatient: Omit<PatiensInterface, 'id'> = { name, age, medical_history }

        try {
            const createdPatient = await PatiensModel.insertPatien(newPatient)

            res.status(201).json({ message: 'Patiens inserted successfully', data: createdPatient })
        } catch (err) {
            res.status(404).json({ message: 'Error inserting patient' })
        }
    }

    public static async updatePatient( req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { name, age, medical_history } = req.body

        const newUpdatePatient: Omit<PatiensInterface, 'id'> = { name, age, medical_history}
        
        try {
            const update = await PatiensModel.updatePatient(newUpdatePatient, parseInt(id))
            
            res.status(201).json({ message: 'Updated medicine successfully', data: update})
        } catch (err) {
            res.status(500).json({ message: 'Error updating patient' })
        }
    }

    public static async deletePatient( req: Request, res: Response): Promise<void>{
        const { id } = req.params 

        try {
            const deletedPatient = await PatiensModel.deletePatient(parseInt(id))

            if(!deletedPatient){
                res.status(404).json({ message: 'Patient not found'})
            }
            
            res.status(201).json({ message: 'Patient deleted successfully'})
        } catch (err) {
            res.status(500).json({ message: 'Error deleting patient'})
        }
    }
}