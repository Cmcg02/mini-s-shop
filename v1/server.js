import express from 'express'
import session from 'express-session'
import userRouter from './routes/user.js'
import { SESSION_SECRET } from './config.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'
const store = new session.MemoryStore()
const server = express()

server.use(express.json())
server.use(cookieParser())
server.use(express.urlencoded({ extended: false }))
server.disable("x-powered-by")

server.use(session({
    secret: SESSION_SECRET,
    cookie: {maxAge: 300000000, sameSite: 'none'},
    resave: false,
    saveUninitialized: false,
    store
}))
server.use('/user', userRouter)

server.use('/auth', authRouter)

server.listen(3000, ()=>console.log('listening on port 3000'))