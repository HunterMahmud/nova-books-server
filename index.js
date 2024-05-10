const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const port = process.env.PORT || 3000;

const app = express();

//middleware

cors({
  origin: [
    "http://localhost:5173",
    //other links will be here
  ],
  credentials: true,
});

app.use(express.json());



const uri =
  `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
   

    
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
 
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("bookshelf server is running...");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
