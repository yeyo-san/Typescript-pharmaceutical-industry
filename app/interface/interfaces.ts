export interface Medicines{
    id: number;
    name: string;
    quantity: number;
    expiration_date: Date;
    price: number;
}

export interface PatiensInterface{
    id: number;
    name: string;
    age: number;
    medical_history: string;
}

export interface PrescriptionsInterface{
    id: number;
    medicamento_id: number;
    dosage: number;
    frecuency: string,
    duration: Date
}