const express = require('express');
require('dotenv').config();
const connectDb = require("./config/database");
const userRouter = require("./routes/userRoute");
const teamRouter = require("./routes/teamRoute");
const projectRouter = require("./routes/projectRoute");
const taskRouter = require("./routes/taskRoute");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4888;

app.use("/api/user",userRouter);
app.use("/api/team",teamRouter);

app.use("/api/project",projectRouter);
app.use("/api/task",taskRouter);


connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running on port",PORT);
    });
});
