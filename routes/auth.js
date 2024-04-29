import express from 'express'
import { userData } from '../db/users.js'
import bcrypt from 'bcrypt'
const authRouter = express.Router()

const isLoggedIn = (req, res, next) => {
    if(!req.session.auth){
        res.sendStatus(401).end()
    }else
        next()
}

const isAdmin = (req, res, next) => {
    if(req.session.role !== '88x0')
        res.sendStatus(401).end()
    else   
        next()
}

authRouter.post('/login', async (req, res)=>{
    const {email, password} = req.body 

    const user = await userData.getByEmail(email)
    if(!user)
        res.sendStatus(404).end()

    else{
        const compare = bcrypt.compare(password, user.hash)
        if(!compare)
            res.sendStatus(401).json({msg: 'email or password incorrect'}).end()

        else{
            req.session.auth = true;
            req.session.user = user.id
            req.session.role = user.role
            res.status(200).send(user).end()
        }
    }
}) 

const passwordStrength = (password) => {
    var str = 0
    if(password.length>8)
        str++
    if(password.length>12)
        str++
    if(password.match(/[a-z]/))
        str++
    if(password.match(/[A-Z]/))
        str++
    if(password.match(/[0-9]/))
        str++
    if(password.match(/[!£$&?-]/))
        str++

    return str
}

authRouter.post('/signup', async (req, res)=>{
    const {name, email, password} = req.body

    if(
        (typeof name !== 'string' || name.length > 50 || !name.match(/[a-z]/i))
    ||
        (typeof email !== 'string' || email.length > 80 || !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/))
    ||
        (typeof password !== 'string' || passwordStrength(password)<3)
    ){
        res.sendStatus(400).end()
    }else{
        const exist = await userData.getByEmail(email)
        if(exist)
            res.sendStatus(409).end()
        else{
            const hash = await bcrypt.hash(password, 10)
            const response = await userData.add(name, email, hash)
            const user = await userData.getByEmail(email)
            req.session.auth = true
            req.session.user = user.id
            req.session.role = user.role
            res.status(200).json(user).end()
            }
    }

})

authRouter.get('/logout', isLoggedIn, (req, res) => {
    req.session.user = false
    req.session.auth = false
    req.session.role = false;
    res.sendStatus(200).end()
})

export {isLoggedIn, isAdmin}

export default authRouter