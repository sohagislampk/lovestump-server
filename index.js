const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();


// Db pss : kgTHb12tXaHj5T5W

//middleware
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://lovestump:kgTHb12tXaHj5T5W@cluster0.9qpmxm2.mongodb.net/?retryWrites=true&w=majority")
        console.log("Db is Connected");
    } catch (error) {
        console.log("DB is not connected");
        console.log(error.message);
    }

}

app.get('/', (req, res) => {
    res.send('Tune Tools Server Is Running');
})

app.listen(port, async (req, res) => {
    console.log('Server is running on port :', port);
    await connectDB();
})