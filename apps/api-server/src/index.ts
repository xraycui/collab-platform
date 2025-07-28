import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './routes/authRoute'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('api/auth', authRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`)
})