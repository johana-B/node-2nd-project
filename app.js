require('dotenv').config();
require('express-async-errors')

const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const courseRouter = require('./routes/courseRoute');
const instractorRouter = require('./routes/InstractorRoute');
const videoRouter = require('./routes/videoStreamRoute');
//middleware
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express();
app.use(express.static('./public'));
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/video', videoRouter)

app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/instractors', instractorRouter);
app.use('/auth', authRouter);
//app.use('/video', videoRouter);

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