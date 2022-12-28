require('dotenv').config();
//require('express-async-errors')
const path = require('path');
const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const userRouter = require('./routes/userRoute')
const courseRouter = require('./routes/courseRoute')
const instractorRouter = require('./routes/InstractorRoute')

//middleware
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')


const app = express();
app.use(express.static('./public'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }))
app.get('/', (req, res) => {
    res.send('e-learning API');
});
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/instractors', instractorRouter);
app.use('public/uploads', express.static(path.join(__dirname, 'public', 'uploads')))
//middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening port ${port}... `));
    } catch (error) {
        console.log(error);
    }
};

start();