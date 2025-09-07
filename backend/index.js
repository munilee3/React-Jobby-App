const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRoutes = require('./routes/userRoutes.js');
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express()
const PORT = 4000

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"]
}))
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

    app.use(bodyParser.json());
    app.use("/", userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
