import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import authRouter from './routes/authRoute'
dotenv.config({path: path.resolve(process.cwd(), '.env.dev')})

console.log('path ', path.resolve(process.cwd(), '.env.dev'))

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`)
})