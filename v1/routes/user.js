import express, { response } from 'express'
import { userData } from '../db/users.js'
const userRouter = express.Router()

userRouter.get('/all', async (req, res, next)=>{
    const response = await userData.getAll()
    res.send(response)
})

userRouter.get('/:id', async (req, res, next)=>{
    const response = await userData.getById(req.params.id)
    res.send(response)
})

userRouter.post('/login', async (req, res, next)=>{
    const {email, password} = req.body 
    const response = await userData.getByEmail(email)
    res.send(response)
})

userRouter.post('/signup', async (req, res, next)=>{
    const {name, email, password} = req.body
    const response = await userData.add(name, email, password)
    res.send(response)
})

userRouter.put('/:id', async (req, res, next)=>{
    const {name, email, password} = req.body
    const {id} = req.params
    if(name){
        const eRes = await userData.update.name(id, name)
    }
    if(email){
        const nRes = await userData.update.email(id, email)
    }
    if(password){
        const pRes = await userData.update.password(id, password)
    }
    const response  = await userData.getById(id)
    res.send(response)
    
})

userRouter.delete('/:id', async (req, res, next)=>{
    const response = await userData.remove(req.params.id)
    res.send(response)
})

userRouter.get('/logout', (req, res, next)=>{})

export default userRouter
