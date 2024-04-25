import express from 'express'
import userRouter from './routes/user.js'
const server = express()

server.use(express.json())

server.use('/user', userRouter)

server.listen(3000, ()=>console.log('listening on port 3000'))