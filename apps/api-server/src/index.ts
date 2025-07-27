import express, {Request, Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (rep: Request, res: Response) => {
    res.send('Api server is running ')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`)
})