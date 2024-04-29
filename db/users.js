import { DATA } from "./index.js";

const getAll = async () => {
    return DATA.query(
        'SELECT * FROM users')
            .then(d=>d.rows)
            .catch(e=>{console.log(e); return false})
}
const getById =  async(id) => {
    return DATA.query(
        'SELECT * FROM users WHERE id = $1', [id])
            .then(d=>d.rows[0])
            .catch(e=>{console.log(e); return false})
}
const getByEmail =  async(email) => {
    return DATA.query(
        'SELECT * FROM users WHERE email = $1', [email])
            .then(d=>d.rows[0])            
            .catch(e=>{console.log(e); return false})
}
const updateName =  async(id, name) => {
    return DATA.query(
        'UPDATE users SET name = $1 WHERE id = $2', [name, id])
            .then(d=>d)
            .catch(e=>{console.log(e); return false})
}
const updateEmail =  async(id, email) => {
    return DATA.query(
        'UPDATE users SET email = $1 WHERE id = $2', [email, id])
            .then(d=>d)
            .catch(e=>{console.log(e); return false})
}
const updateHash =  async(id, password) => {
    return DATA.query(
        'UPDATE users SET hash = $1 WHERE id = $2', [password, id])
            .then(d=>d)
            .catch(e=>{console.log(e); return false})
}
const remove =  async(id) =>{ 
    return DATA.query(
        'DELETE FROM users WHERE id = $1', [id])
            .then(d=>d)
            .catch(e=>{console.log(e); return false})
}
const add = async (name, email, hash) => {
    return DATA.query(
        'INSERT INTO users (name, email, hash) VALUES ($1, $2, $3)', [name, email, hash])
            .then(d=>d)
            .catch(e=>{console.log(e); return false})
}

export const userData = {
    getAll, 
    getById, 
    getByEmail, 
    update: {
        email: updateEmail,
        name: updateName,
        password: updateHash,
    }, 
    remove, 
    add
}