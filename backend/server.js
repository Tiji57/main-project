import express from "express"
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from "./config/mongodb.js"
// import { getStudents } from './controllers/studentController.js';
import userRouter from "./routes/userRoute.js"
import studentRoutes from "./routes/studentRoute.js"
import feeRoutes from './routes/feeRoutes.js';
import deleteUser from "./routes/userRoute.js";
import financeRoutes from "./routes/financeRoute.js";
// import driverRoutes from './routes/driverRoutes.js';





//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()


// middlewares

app.use(express.json())
app.use(cors())

//Api endpoints
app.use('/api/user',userRouter)
app.use('/api/students', studentRoutes);
app.delete('/api/user',deleteUser);
app.use('/api/finance', financeRoutes);


app.use('/api',feeRoutes);





app.get('/',(rer,res)=>{
    res.send("API Working")
})


app.listen(port, ()=>{
    console.log("Server started on port :"+ port)
})