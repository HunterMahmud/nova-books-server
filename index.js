const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    //other links will be here
  ],
  // credentials: true,
}))

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USE}:${process.env.DB_PASS}@cluster0.9wkdqn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
   
    const booksCollection = client.db("bookDB").collection("books");
    const categoriesCollection = client.db("bookDB").collection("categories");

    // books related api
    //load all books data
    app.get("/allBooks", async(req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });
    
    // add new book info db
    app.post("/addBook", async(req, res)=> {
      const bookInfo = req.body;
      console.log(bookInfo);
      const result = await booksCollection.insertOne(bookInfo);
      res.send(result);
    })

    /// update/details page books data of single book
    app.get("/books/:id", async(req, res)=> {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await booksCollection.findOne(query)
      res.send(result);
    })
    //update book by id
    app.patch('/updatebook/:id', async(req, res)=>{
      const info = req.body;
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const updateInfo = {
        $set: {
          ...info,
        },
      };
      const result = await booksCollection.updateOne(query, updateInfo);
      res.send(result);
    })


    //category related apis

    // get all category 
    app.get('/categories', async(req, res)=> {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    })
    

    //get books by category name
    app.get('/category/:categoryName', async(req, res)=> {
      const cName = req.params.categoryName;
      const query = {category: cName};
      const result = await booksCollection.find(query).toArray()
      // console.log(result);
      res.send(result)
    })

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
