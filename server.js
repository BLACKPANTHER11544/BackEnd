const express = require("express") ; 
const app = express() ;
const cors = require("cors") ; 
const mongoose = require("mongoose") ;
const UserRoutes = require("./routs/user")
const itemRouts = require("./routs/item") ;
require("dotenv").config() ;

const port = process.env.port || 5000 ; 

const mongoAtlasUri = process.env.uri ; 
try {
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

  } catch (e) {
    console.log("could not connect");
  }

const connection = mongoose.connection ; 
connection.once("open",()=>{
    console.log("Successfully Connected to MongoAtlas Cluster ")
})

app.use(cors())
app.use(express.json()) ; 
app.use('/users',UserRoutes) ;
app.use("/items",itemRouts);


app.listen(3000,()=>{
    console.log(`Listingin to port ${port}`)
})


