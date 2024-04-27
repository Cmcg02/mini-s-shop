import { DATA } from "./index.js";

const getAll = async () => {
    return await DATA.query(
        'SELECT * FROM products')
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}            
const getById = async (id) => {
    return await DATA.query(
        'SELECT * FROM products WHERE id = $1', [id])
            .then(d=>d.rows[0])
            .catch(e=>console.log(e))
}
const getByCategory = async (category) => {
    return await DATA.query(
        'SELECT * FROM products WHERE category = $1', [category])
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const updateName = async (id, name) => {
    return await DATA.query(
        'UPDATE products SET name = $1 WHERE id = $2', [name, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updatePrice = async (id, price) => {
    return await DATA.query(
        'UPDATE products SET price = $1 WHERE id = $2', [price, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateDescription = async (id, description) => {
    return await DATA.query(
        'UPDATE products SET description = $1 WHERE id = $2', [description, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateQuantity = async (id, quantity) => {
    return await DATA.query(
        'UPDATE products SET quantity = $1 WHERE id = $2', [quantity, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const updateCategory = async (id, category) => {
    return await DATA.query(
        'UPDATE products SET category = $1 WHERE id = $2', [category, id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const remove = async (id) => {
    return await DATA.query(
        'DELETE FROM products WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const add = async (name, description, price, quantity, category) => {
    return await DATA.query(
        'INSERT INTO products (name, description, price, quantity, category) VALUES ($1, $2, $3, $4)', [name, description, price, quantity, category])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}

export const productData = {
    getAll, 
    getById,
    getByCategory,
    update: {
        name: updateName,
        description: updateDescription,
        price: updatePrice,
        category: updateCategory
    },
    updateQuantity, add, remove
}