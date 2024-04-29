import express from 'express'
import { productData } from '../db/products.js'
import { isAdmin, isLoggedIn } from './auth.js'
const productsRouter = express.Router()

productsRouter.get('/', async (req, res)=>{
    const products = await productData.getAll()
    if(!products)
        res.sendStatus(500).end()
    else    
        res.status(200).json({products})
})

productsRouter.post('/', isLoggedIn, isAdmin, async (req, res) => {
    const {name, description, stock, price, category} = req.body
    const response = await productData.add(name, description, price, stock, category)
    if(!response)
        res.sendStatus(500)
    else{
        res.sendStatus(200)
    }
})

productsRouter.get('/category/:category', async (req, res) => {
    const {category} = req.params
    const products = await productData.getByCategory(category)
    if(!products)
        res.sendStatus(404).end()
    else
        res.status(200).json({products}).end()
})

productsRouter.get('/:id', async(req, res) => {
    const {id} = req.params
    const product = await productData.getById(id)
    if(!product)
        res.sendStatus(404).end()
    else 
        res.status(200).json({product})
})

productsRouter.put('/:id', isLoggedIn, isAdmin, async (req, res)=>{
    const {name, description, stock, price, category} = req.body
    const {id} = req.params

    var product = await productData.getById(id)
    if(!product)
        res.sendStatus(404).end()
    else {
        var {n,d,q,p,c,s} = false
        if(name)
            n = await productData.update.name(id, name)
        if(description)
            d = await productData.update.description(id, description)
        if(stock)
            q = await productData.update.stock(id, stock)
        if(price)
            p = await productData.update.price(id, price)
        if(category)
            c = await productData.update.category(id, category)

        product = await productData.getById(id)

        res.send(product)
    }


})

productsRouter.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
    const {id} = req.params
    const product = await productData.getById(id)
    if(!product){
        res.sendStatus(404).end()
    }else{
        const response = await productData.remove(id)
        res.sendStatus(200)
    }
})


export default productsRouter