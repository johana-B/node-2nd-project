require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const courseRouter = require('./routes/courseRoute')
const instractorRouter = require('./routes/InstractorRoute')

//middleware
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')


const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('e-learning API');
});
app.use('/course', courseRouter);
app.use('/instractor', instractorRouter);

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