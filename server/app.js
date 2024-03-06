// importing required modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000
const userRoutes = require('./routes/userRoutes')
const morgan = require('morgan')

// creating express app
const app = express()

//connect to MongoDB
connectDB()

//using middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//logs
app.use((req,res,next)=>{
    const d = new Date();
    fs.writeFile('access.log', `${req.method} ${req.url} ${d.toLocaleDateString()} ${d.toLocaleTimeString()} ${req.user ? req.user : ''}\n`, {flag:'a'}, (err)=>{
        if(err) throw err
    })
    next()
})

//public routes
app.use('/api/user', userRoutes)

//private routes


app.get('/', (req,res)=>{
    res.send('Welcome to CodeWithAsh')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})