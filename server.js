const express = require('express');
require('dotenv').config();
const userRouter = require("./routes/userRoute");
const connectDb = require("./config/database");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4888;

app.use("/api/user",userRouter);

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running on port",PORT);
    });
});
