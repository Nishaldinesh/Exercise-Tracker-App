const express= require('express');
const cors=require('cors');
const { json } = require('express');
const mongoose=require('mongoose');

require('dotenv').config();

const app= express();
const port= process.env.PORT || 5000;

app.use(cors);
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri, {   useNewUrlParser: true, useUnifiedTopology: true}
  );

  const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB database connected successfully");
});

app.listen(port, ()=>{
    console.log(`Server is running in port: ${port}`);
});