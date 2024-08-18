import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();
//Midde=leware for parsing request body
app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack tutorial')
    
});

//Route for Save a new Book
app.post('/books', async(request, response)=>{
    try {
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishedYear
        ){
            return response.status(400).send({message: 'Send all required fields: title, author, publishedYear'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        }
        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get All Books from db
app.get('/books', async(request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get One Book from db by id
app.get('/books/:id', async(request, response)=>{
    try {
        const {id} =request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Update a Book
app.put('/books/:id', async(request, response)=>{
    try {
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishedYear
        ){
            return response.status(400).send({message: 'Send all required fields: title, author, publishedYear'});
        }
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book Updated successfully!'});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


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
