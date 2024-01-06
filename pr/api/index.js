import express from "express"
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

const app=express()
app.use(express.json())
app.use(cookieParser("hhhhabdo"));  // ad cookie parser hia li kat5lina njibo l cookie mn session


// app.get("/test",(req,res)=>{
//     res.json("it works")
// })


app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)



app.listen(8000,()=>{
    console.log('connected!')
})
