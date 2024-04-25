import { Pool } from "pg";

const cred = {
    user: 'e_commerce',
    host: 'localhost',
    database: 'e_commerce',
    password: 'callam123',
    port: 5432
}

export const DATA = new Pool(cred)