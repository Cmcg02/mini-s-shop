import { DATA } from "./index.js";

const getAll = () => {
    DATA.query(
        'SELECT * FROM products')
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}            
const getById = (id) => {
    DATA.query(
        'SELECT * FROM products WHERE id = $1', [id])
            .then(d=>d.rows[0])
            .catch(console.log(e))
}
const updateName = (id, name) => {
    DATA.query(
        'UPDATE products SET name = $1 WHERE id = $2', [name, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updatePrice = (id, price) => {
    DATA.query(
        'UPDATE products SET price = $1 WHERE id = $2', [price, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateDescription = (id, description) => {
    DATA.query(
        'UPDATE products SET description = $1 WHERE id = $2', [description, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateQuantity = (id, quantity) => {
    DATA.query(
        'UPDATE products SET quantity = $1 WHERE id = $2', [quantity, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const remove = (id) => {
    DATA.query(
        'DELETE FROM products WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const add = (name, description, price, quantity) => {
    DATA.query(
        'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4)', [name, description, price, quantity])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}

export const productData = {
    getAll, 
    getById,
    update: {
        name: updateName,
        description: updateDescription,
        price: updatePrice
    },
    updateQuantity, add, remove
}