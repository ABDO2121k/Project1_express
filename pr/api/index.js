import express from "express"
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

const app=express()
app.use(express.json())
app.use(cors({origin:"https://blog-client-cn05.onrender.com",credentials:true}))
app.use(cookieParser("hhhhabdo"));  // ad cookie parser hia li kat5lina njibo l cookie mn session


app.use(express.static(path.join(process.cwd(), 'client/build')));

// Handle GET requests to all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/build', 'index.html'));
});


app.use("/api/posts",postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)



app.listen(8000,()=>{
    console.log('connected!')
})
