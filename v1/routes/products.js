import express from 'express'
import { productData } from '../db/products.js'
const productsRouter = express.Router()

productsRouter.get('/', async (req, res)=>{
    const products = await productData.getAll()
    if(!products)
        res.sendStatus(500).end()
    else    
        res.status(200).json({products})
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

export default productsRouter