import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidation, loginValidation, postCreateValidation, postUpdateValidation } from './validations/index.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';
import {UserController, PostController} from './controllers/index.js';

mongoose.connect('mongodb+srv://admin:123@reactnode.njrrm88.mongodb.net/blog?retryWrites=true&w=majority')
        .then(() => console.log('MongoDB OK'))
        .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post( '/auth/login', loginValidation, handleValidationErrors, UserController.login );
app.post( '/auth/register', registerValidation, handleValidationErrors, UserController.register );
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll );
app.get('/posts/:id', PostController.getOne );
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create );
app.delete('/posts/:id', checkAuth, PostController.remove );
app.patch('/posts/:id', checkAuth, postUpdateValidation, handleValidationErrors, PostController.update );

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen( 4444, (err) => {
    if ( err ) {
        return console.log('Error:', err);
    }

    console.log('Server OK');
} );