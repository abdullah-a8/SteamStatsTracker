// server.js

"use strict";

require('dotenv').config();

/* Server environment setup */
const env = process.env.NODE_ENV; // read the environment variable (will be 'production' in production mode)

const log = console.log;
const path = require('path');
const express = require("express");
const app = express();
const socket = require("socket.io");

// Import required modules
const cors = require('cors');

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Your front-end URL
    credentials: true,               // Allow cookies (credentials) to be sent
    optionsSuccessStatus: 200        // Some legacy browsers choke on 204
};

// Apply CORS middleware before defining routes or other middleware
app.use(cors(corsOptions));

// Body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Session handling
const session = require("express-session");
const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Replace with your own secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000,
        httpOnly: true,
        secure: false, // Should be true in production with HTTPS
    },
    store: env === 'production' ? MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/steamTracker',
    }) : null,
}));

// Mongoose and Mongo connection
const { mongoose } = require("./db/mongoose");

// Import the mongoose models
const { User } = require("./models/user");
const { Chat } = require("./models/chat");
const { storeMessage } = require("./routes/helpers/messages");
// To validate object IDs
const { ObjectID } = require("mongodb");

// Import routes
app.use(require('./routes/login'));
app.use(require('./routes/steam'));
app.use(require('./routes/friend'));
app.use(require('./routes/chat'));
app.use(require('./routes/reputation'));
app.use(require('./routes/review'));
app.use(require('./routes/voteRecord'));
app.use(require('./routes/user'));
app.use(require('./routes/profilePic'));

// Serve the build
app.use(express.static(path.join(__dirname, "/achievement-tracker/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/achievement-tracker/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    log(`Listening on port ${port}...`);
});

// Socket.io setup
const io = socket(server);
io.on('connection', (socket) => {
    console.log("User socket connected...");

    socket.on('room', (data) => {
        socket.join(data.chatRoomId);
        console.log(`Username: ${data.name} joined Room: ${data.chatRoomId}`);
        socket.emit('joined', data.chatRoomId);
    });

    socket.on('chat', (obj) => {
        // Need to store on database
        storeMessage(socket, obj);
        socket.to(obj.id).emit("chat", obj.data);
    });

    socket.on('close', () => {
        socket.disconnect(0);
        console.log('User socket disconnected...');
    });
});
