import { DATA } from "./index.js";

const getAll = () => {
    DATA.query(
        'SELECT users.name, orders.basket, orders.complete FROM orders JOIN users ON users.id = orders.user_id')
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const getById = (id) => {
    DATA.query(
        'SELECT users.name, orders.basket, orders.complete FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1', [id])
            .then(d=>d.rows[0])
            .catch(console.log(e))
}
const getByUser = (user_id) => {
    DATA.query(
        'SELECT users.name, orders.basket, orders.complete FROM orders JOIN users ON users.id = orders.user_id WHERE orders.user_id = $1', [user_id])
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const complete = (id) => {
    DATA.query(
        'UPDATE orders SET complete = true WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const remove = (id) =>{ 
    DATA.query(
        'DELETE FROM orders WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const add = (user_id, basket) => {
    DATA.query(
        'INSERT INTO orders (user_id, basket) VALUES ($1, $2)', [user_id, basket])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}

export const orderData = {
    getAll, 
    getById, 
    getByUser, 
    complete, 
    remove, 
    add
}