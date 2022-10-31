const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const env = require('dotenv');

env.config({path:"./config/config.env"})
app.use(express.json())
app.use(bodyParser.json())

app.use("/users",require("./routes/userRoutes"))

const PORT = process.env.PORT|| 5050
app.listen(PORT,()=>{
    console.log("Servere is running... at port " + PORT)
})