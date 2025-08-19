import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

import authRouter from './routes/authRoute'
import userRouter from './routes/userRoute'
import boardRouter from './routes/boardRoute'
import taskRouter from './routes/taskRoute'
import jobRouter from './routes/jobRoute'

import { connectMogo } from './mongo/connection'
import { startNotificationSubscriber } from './notifications/subscriber'
import { setIO

 } from './realtime/io'
dotenv.config({path: path.resolve(process.cwd(), '.env.dev')})

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/boards', boardRouter)
app.use('/api/boards', taskRouter)
app.use('/api/job', jobRouter)

// web socket server
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: "*", methods: ['GET', 'POST', 'PATCH']}
})

setIO(io)
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token
        if(!token) return next(new Error('Missing token'))
        const JWT_SECRET = process.env.JWT_SECRET as string
        const payload = jwt.verify(token, JWT_SECRET)
        socket.user = payload
        next()
    } catch (err) {
        next(new Error('Unauthorized'))
    }
})

io.on('connection', (socket) => {
  const user = (socket as any).user as {id: string, email: string};
  
  // Join user room
  socket.join(`user:${user.id}`)

  // Join board rooms (client will tell which board)
  socket.on("board:join", (boardId: string) => {
    socket.join(`board:${boardId}`);
  });

  socket.on("board:leave", (boardId: string) => {
    socket.leave(`board:${boardId}`);
  });

  // Relay task updates to everyone in the board room
  socket.on("task:create", (boardId: string, task: any) => {
    socket.to(`board:${boardId}`).emit("task:created", task);
  });

  socket.on("task:update", (boardId: string, task: any) => {
    socket.to(`board:${boardId}`).emit("task:updated", task);
  });

  socket.on("comment:create", (boardId: string, comment: any) => {
    socket.to(`board:${boardId}`).emit("comment:created", comment);
  });
})

async function start() {
    await connectMogo()
    await startNotificationSubscriber()
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`)
    })
}

start().catch((e) => {
    console.log('Failed to start server: ', e)
    process.exit(1)
})
