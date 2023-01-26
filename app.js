require('dotenv').config();
require('express-async-errors')

const express = require('express');
const connectDB = require('./db/connect');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
//security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
//routes
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const courseRouter = require('./routes/courseRoute');
const instractorRouter = require('./routes/InstractorRoute');
//middleware
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const { authenticateUser } = require('./middleware/authentication')
const app = express();
// live server
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
app.set('view engine', 'ejs');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});


app.use(express.static('./public'));
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }))
//security
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize());

app.use('/peerjs', peerServer);
app.use('/users', userRouter);
app.use('/courses', courseRouter);
app.use('/instractors', instractorRouter);
app.use('/auth', authRouter);

app.get('/zoom', (req, res) => {
    res.redirect(`/zoom-${uuidV4()}`)
})
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(`user ${userId} joined ${roomId}`);
        socket.join(roomId);
        socket.on('ready', () => {
            socket.broadcast.to(roomId).emit('user-connected', userId);
        })
        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })
    })

})


//middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, console.log(`server is listening port ${port}... `));
    } catch (error) {
        console.log(error);
    }
};

start();