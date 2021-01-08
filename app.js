const express = require('express')
const app = express()
const mongoose = require('mongoose')


const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')


// import routes

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')
// const categoryRoutes = require('./routes/category')


require('dotenv').config()

//db
mongoose.connect("mongodb://localhost/jan",{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('database connected')
}).catch(err=>console.log('error in connecting database'))

// middleware 

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

// routes middleware
 
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",postRoutes)
// app.use("/api",categoryRoutes)


const port = process.env.PORT||8000

app.listen(port,()=>{
    console.log( `server running at ${port}`)
})