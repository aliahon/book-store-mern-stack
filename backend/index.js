import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoutes from "./routes/booksRoutes.js"

const app = express();
//Midde=leware for parsing request body
app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack tutorial')
    
});
app.use('/books', booksRoutes);
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
            
        });
    })
    .catch((error)=>{
        console.log(error);
    })
