import { DATA } from "./index.js";

const getAll = () => {
    DATA.query(
        'SELECT * FROM users')
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const getById = (id) => {
    DATA.query(
        'SELECT * FROM users WHERE orders.id = $1', [id])
            .then(d=>d.rows[0])
            .catch(console.log(e))
}
const getByEmail = (user_id) => {
    DATA.query(
        'SELECT * FROM users WHERE orders.user_id = $1', [user_id])
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const updateName = (id, name) => {
    DATA.query(
        'UPDATE users SET name = $1 WHERE id = $2', [name, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateEmail = (id, email) => {
    DATA.query(
        'UPDATE users SET email = $1 WHERE id = $2', [email, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateHash = (id, password) => {
    DATA.query(
        'UPDATE users SET hash = $1 WHERE id = $2', [password, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const remove = (id) =>{ 
    DATA.query(
        'DELETE FROM users WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const add = (user_id, basket) => {
    DATA.query(
        'INSERT INTO users (user_id, basket) VALUES ($1, $2)', [user_id, basket])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
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