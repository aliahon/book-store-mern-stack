import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route for Save a new Book
router.post('/', async(request, response)=>{
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
router.get('/', async(request, response)=>{
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
router.get('/:id', async(request, response)=>{
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
router.put('/:id', async(request, response)=>{
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

//Route for Get One Book from db by id
router.delete('/:id', async(request, response)=>{
    try {
        const {id} =request.params;
        const res = await Book.findByIdAndDelete(id);
        if(!res){
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book Deleted successfully!'});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;