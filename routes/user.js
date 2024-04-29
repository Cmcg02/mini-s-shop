import express, { response } from 'express'
import { userData } from '../db/users.js'
import { isLoggedIn, isAdmin } from './auth.js'
import bcrypt from 'bcrypt'
const userRouter = express.Router()

const allowedAccess = (req, res, next) => {
    const {id} = req.params

    if(parseInt(id) !== req.session.user){
        if(req.session.role !== '88x0')
            res.sendStatus(401).end()
        else{
            next()
        }
    }else{
        next()
    }
}

userRouter.get('/', isLoggedIn, isAdmin, async (req, res)=>{
    const users = await userData.getAll()
    if(!users)
        res.sendStatus(500).end()
    else
        res.status(200).json({users}).end()
})

userRouter.get('/:id', isLoggedIn, allowedAccess, async (req, res)=>{
    const {id} = req.params
    const user = await userData.getById(id)
    if(!user)
        res.sendStatus(404).end()
    else
        res.status(200).json({user})
})

userRouter.put('/:id', isLoggedIn, allowedAccess, async (req, res)=>{
    const {name, email, password} = req.body
    const {id} = req.params

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
        res.sendStatus(200).end()
})

export default userRouter
