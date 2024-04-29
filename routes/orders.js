import { orderData } from "../db/orders.js"
import {v4} from 'uuid'
import express from 'express'
import { calculateTotal } from "./cart.js"
import { isAdmin, isLoggedIn } from "./auth.js"
import moment from "moment/moment.js"
const ordersRouter = express.Router()

const paymentFunction = async (total, accountNumber, exp, cvv, email) => {
    const d = moment(exp)
    if(typeof accountNumber === 'number' && accountNumber.toString().length === 16){
        if(moment().isBefore(d)){
            if(typeof cvv === 'number' && cvv.toString().length === 3){
                //this will take payments and only return true if the payment is successful
                console.log(`total: £${parseFloat(total)/100} charged to ${email}`)
                return true
            }else{
                console.log('cvv ' + cvv)
            }
        }else
            console.log('d ' + d)
    }else
        console.log('accountNumber ' + accountNumber)
    return false
    
}

const sendOrder = async (req, res, next) => {
    var cart_id
    if(req.cart_id)
        cart_id = req.cart_id
    else
        cart_id = req.params.id
    
    const order = await orderData.getById(cart_id)
    if(!order)
        res.sendStatus(404).end()
    else
        res.send(order)
}

const resetCart = (req, res, next) => {
    req.session.cart = []
    req.session.total = 0
    next()
}

const checkout = async (req, res, next) => {
    const {total} = req.session
    if (!req.session.total){
        res.sendStatus(400).end()
    }else{
        const {email, accountNumber, exp, cvv} = req.body
        const payment = await paymentFunction(req.session.total, accountNumber, exp, cvv, email)

        if(!payment){
            res.sendStatus(402).end()
        }else{
            const cart_id = v4()
            const orderResponse = await orderData.add(req.session.user, cart_id, req.session.total)

            const itemArr = []
            req.session.cart.forEach(item => {
                for(var i = 0; i < item.quantity; i++)
                    itemArr.push(item.product.id)
            });

            const cartResponse = orderData.addCart(itemArr, cart_id)
            if(!cartResponse || !orderResponse)
                res.sensStatus(500)
            else{
                req.cart_id = cart_id
                next()
            }
        }
    }
}

const allowedAccess = async (req, res, next) => {
    const {id} = req.params
    const order = await orderData.getById(id)
    if(!order)
        res.sendStatus(404)
    else{
        if(parseInt(order.user) !== req.session.user){
            console.log('order user ' + order)
            console.log('cureent user ' + req.session.user)
            if(req.session.role !== '88x0'){
                res.send(order).end()}
            else{
                next()
            }
        }else{
            next()
        }
    }

}

ordersRouter.get('/', isLoggedIn, async (req, res) => {
    if(req.session.role === '88x0'){
        const orders = await orderData.getAll()
        res.send(orders)
    }else{
        const id = req.session.user
        const orders = await orderData.getByUser(id)
        res.send(orders)
    }
})

ordersRouter.post('/checkout', isLoggedIn, calculateTotal, checkout, resetCart, sendOrder)

ordersRouter.put('/:id', isLoggedIn, isAdmin, async (req, res, next)=>{
    const {id} = req.params
    var order = await orderData.getById(id)
    if(!order)
        res.sendStatus(404)
    else{
        const response = await orderData.complete(id)
        if(!response)
            res.sendStatus(500)
        else{
            next()
        }
    }

}, sendOrder)

ordersRouter.get('/:id', isLoggedIn, allowedAccess, sendOrder)

export default ordersRouter