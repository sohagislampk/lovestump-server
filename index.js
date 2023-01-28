const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();




//middleware
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9qpmxm2.mongodb.net/?retryWrites=true&w=majority`)
        console.log("DB is Connected");
    } catch (error) {
        console.log("DB is not connected");
        console.log(error.message);
    }

}
// Users Schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    dob: Date,
    password: {
        type: String,
        required: true
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// USers Model
const User = mongoose.model("users", usersSchema);

app.post('/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            dob: req.body.dob,
            password: req.body.password,
            image: req.body.image
        })
        const userData = await newUser.save();
        res.status(201).send(userData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({ message: "Users not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
app.get('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ userName: username })
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
app.get('/', (req, res) => {
    res.send('Lovestump Server Is Running');
})

app.listen(port, async (req, res) => {
    console.log('Server is running on port :', port);
    await connectDB();
})