import express, { response } from 'express'
import { userData } from '../db/users.js'
import { veryify, admin } from './auth.js'
import bcrypt from 'bcrypt'
const userRouter = express.Router()

userRouter.get('/', veryify, admin, async (req, res)=>{
    const users = await userData.getAll()
    if(!users)
        res.sendStatus(500).end()
    else
        res.status(200).json({users}).end()
})

userRouter.get('/:id', veryify, async (req, res)=>{
    const user = await userData.getById(req.params.id)
    if(!user)
        res.sendStatus(404).end()
    else
        res.status(200).json({user})
})

userRouter.put('/:id', veryify, async (req, res)=>{
    const {name, email, password} = req.body
    const {id} = req.params
    var user = await userData.getById(id)

    if(req.session.role !== '88x0' && id ==! req.session.user){
        res.sendStatus(401).end()
    }else{

        if(!user)
            res.sendStatus(404).end()
        else{
            var n, e, p = true

            if(name)
                n = await userData.update.name(id, name)
            if(email)
                e = await userData.update.email(id, email)
            if(password){
                const hash = await bcrypt.hash(password, 10)
                p = await userData.update.password(id, hash)
            }
            user = await userData.getById(id)

            if(!(n && e && p && user))
                res.sendStatus(500).end()
            else
                res.status(200).json(user)
            
        }
    }

})

export default userRouter
