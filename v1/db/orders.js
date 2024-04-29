import { DATA } from "./index.js";

const getAll = async () => {
    return await DATA.query(
        'SELECT users.name as user, orders.id as reference, orders.total, orders.complete as completed FROM orders JOIN users ON users.id = orders.user_id')
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const getById = async (id) => {
    return await DATA.query(
        'SELECT orders.user_id as user, orders.id as order, orders.complete, orders.total, products.name FROM orders_products JOIN orders ON orders.id = orders_products.cart JOIN products ON products.id = orders_products.product WHERE orders.id = $1', [id])
            .then(d=>{
                return {
                    user: d.rows[0].user,
                    order: d.rows[0].order,
                    total: d.rows[0].total,
                    completed: d.rows[0].complete,
                    items: d.rows.map(i=>{
                        const {total, order, complete, ...item} = i
                        return item
                    })
                }
            })
            .catch(e=>console.log(e))
}
const getByUser = async (user_id) => {
    return await DATA.query(
        'SELECT users.name as user, orders.id as reference, orders.total, orders.complete as completed FROM orders JOIN users ON users.id = orders.user_id WHERE orders.user_id = $1', [user_id])
            .then(d=>d.rows)
            .catch(e=>console.log(e))
}
const complete = async (id) => {
    return await DATA.query(
        'UPDATE orders SET complete = true WHERE id = $1', [id])
            .then(()=>true)
            .catch(e=>console.log(e))
}
const remove = async (id) =>{ 
    return await DATA.query(
        'DELETE FROM orders WHERE id = $1', [id])
            .then(d=>true)
            .catch(e=>console.log(e))
}
const add = async (user_id, cart_id, total) => {
    return await DATA.query(
        'INSERT INTO orders (user_id, id, total) VALUES ($1, $2, $3)', [user_id, cart_id, total])
            .then(()=>true)
            .catch(e=>console.log(e))
}
const addCart = (cart, id) => {
    const responseArr = cart.map(async item=>{
        return await DATA.query(
            'INSERT INTO orders_products (product, cart) VALUES ($1, $2)',[item, id])
                .then(()=>true)
                .catch(e=>console.log(e))
    })
    return responseArr
}

export const orderData = {
    getAll, 
    getById, 
    getByUser, 
    complete, 
    remove, 
    add,
    addCart
}