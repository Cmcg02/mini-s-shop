import express from 'express'
import { productData } from '../db/products.js'
const cartRouter = express.Router()

cartRouter.use((req, res, next) => {
    if(!req.session.cart){
        req.session.cart = []
    }
    next()
})

const calculateTotal = (req, res, next) => {
    const cart = req.session.cart
    var total = 0

    cart.forEach(item => {
        total=item.product.price*item.quantity
    });
    req.session.total = total
    next()
}

const addProduct = async (req, res, next) => {
    const {id} = req.params
    const product = await productData.getById(id)
    if(!product)
        res.sendStatus(404).end()
    else{
        req.session.cart.push({product, quantity: 1})
        next()
    }
}

const changeQuantity = (req, res, next) => {
    const {id} = req.params
    var {quantity} = req.body
    const item = req.session.cart.find(i=>parseInt(id) === i.product.id)
    if(!item){
        res.sendStatus(404).end()
    }else{
        if(isNaN(quantity))
            res.sendStatus(400).end()
        else{
            if(quantity>item.product.stock){
                quantity=item.product.stock
            }else{
                req.session.cart = req.session.cart.map(i=>{
                    if(i === item)
                        i.quantity = quantity
                    return i
                })
                next()
            }
        }
    }
}

const removeItem = (req, res, next) => {
    const {id} = req.params
    var {quantity} = req.body
    const item = req.session.cart.find(i=>parseInt(id) === i.product.id)
    if(!item){
        res.sendStatus(404).end()
    }else{
        const lengthBefore = req.session.cart.length
        req.session.cart = req.session.cart.filter(i=>i!==item)
        const lengthAfter = req.session.cart.length
        if(lengthBefore === lengthAfter){
            res.sendStatus(500)
        }else{
            next()
        }
    }
}

const sendCart = (req, res) => {
    const {cart, total} = req.session
    res.json({cart, total}).end()
}

cartRouter.post('/:id', addProduct)

cartRouter.put('/:id', changeQuantity)

cartRouter.delete('/:id', removeItem)

cartRouter.use(calculateTotal, sendCart)

export default cartRouter