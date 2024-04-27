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
            .then(d=>d)
            .catch(e=>console.log(e))
}
const updatePrice = async (id, price) => {
    return await DATA.query(
        'UPDATE products SET price = $1 WHERE id = $2', [price, id])
            .then(d=>d)
            .catch(e=>console.log(e))
}
const updateDescription = async (id, description) => {
    return await DATA.query(
        'UPDATE products SET description = $1 WHERE id = $2', [description, id])
            .then(d=>d)
            .catch(e=>console.log(e))
}
const updateStock = async (id, stock) => {
    return await DATA.query(
        'UPDATE products SET stock = $1 WHERE id = $2', [stock, id])
            .then(d=>d)
            .catch(e=>console.log(e))
}
const updateCategory = async (id, category) => {
    return await DATA.query(
        'UPDATE products SET category = $1 WHERE id = $2', [category, id])
            .then(d=>d)
            .catch(e=>console.log(e))
}
const updateSize = async (id, size) => {
    return await DATA.query(
        'UPDATE products SET size = $1 WHERE id = $2', [size, id])
            .then(d=>d)
            .catch(e=>console.log(e))
}
const remove = async (id) => {
    return await DATA.query(
        'DELETE FROM products WHERE id = $1', [id])
            .then(d=>console.log(d))
            .catch(e=>console.log(e))
}
const add = async (name, description, price, stock, category, size) => {
    return await DATA.query(
        'INSERT INTO products (name, description, price, stock, category, size) VALUES ($1, $2, $3, $4, $5, $6)', [name, description, price, stock, category, size])
            .then(d=>{console.log(d); return true})
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
        category: updateCategory,
        stock: updateStock,
        size: updateSize
    },
    add, 
    remove
}