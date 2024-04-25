import express from 'express'
import { SELECTusersAll } from './db/orders.js'
const server = express()

server.get('/', (req, res, next) => {
    const response = SELECTusersAll
    console.log(response)
    res.sendStatus(200)
})

server.listen(3000, ()=>console.log('listening on port 3000'))