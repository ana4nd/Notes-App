import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js";
import userRoutes from './routes/userRoutes.js'
import cors from "cors";

const app = express();

const PORT = 3000 || process.env.PORT ;

app.use(cors({
    origin:'https://notes-app-ng2t.vercel.app',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);

// Calling Database
connectDB();

app.get('/',(req,res)=>{
    res.send('Welcome to home page');
})

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
})