const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      //other links will be here
    ],
    // credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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
    const borrowCollection = client.db("bookDB").collection("borrows");

    // books related api
    //load all books data
    app.get("/allBooks", async (req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });

    // add new book info db
    app.post("/addBook", async (req, res) => {
      const bookInfo = req.body;
      // console.log(bookInfo);
      const result = await booksCollection.insertOne(bookInfo);
      res.send(result);
    });

    /// update/details page books data of single book
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await booksCollection.findOne(query);
      res.send(result);
    });
    //update book by id
    app.patch("/updatebook/:id", async (req, res) => {
      const info = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateInfo = {
        $set: {
          ...info,
        },
      };
      const result = await booksCollection.updateOne(query, updateInfo);
      res.send(result);
    });

    //category related apis

    // get all category
    app.get("/categories", async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    //get books by category name
    app.get("/category/:categoryName", async (req, res) => {
      const cName = req.params.categoryName;
      const query = { category: cName };
      const result = await booksCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });

    // borrowed books related api
    // borrowed books by user email saved to db
    app.post("/borrow/:id", async (req, res) => {
      const info = req.body;
      const id = req.params.id;
      // console.log(info, id);

      const query = { id: id, borrowerEmail: info.borrowerEmail };
      // console.log(query);
      const isExist = await borrowCollection.findOne(query);
      if (isExist) {
        return res.send({ exist: true });
      }
      const borrowInfo = {
        ...info,
      };
      // console.log(borrowInfo);
      const result = await borrowCollection.insertOne(borrowInfo);
      res.send(result);
    });

    // return borrow to delete the borrow book by id
    app.delete("/borrow/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)};
      const result = await borrowCollection.deleteOne(query);
      res.send(result);
    });

    //borrow to decrease/increase the quantity by 1

    app.patch("/books/:id", async (req, res) => {
      const id = req.params.id;
      // const category = req.body;
      const {operation} = req.body;
      // console.log(operation);
      const query = { _id: new ObjectId(id) };
    
      
      if(operation === '+'){
        const result = await booksCollection.findOneAndUpdate(query, { $inc: { quantity: 1 } },  { returnOriginal: false });
        return res.send(result);
      }
      else{
        const result = await booksCollection.findOneAndUpdate(query, { $inc: { quantity: -1 } },  { returnOriginal: false });
        return res.send(result);
      }
    });

    //get all borrow books by email
    app.get("/borrow/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const query = { borrowerEmail: email };
      const result = await borrowCollection.find(query).toArray();
      res.send(result);
    });

    //jwt related api

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET, {
        expiresIn: "1h",
      });
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      };
      res.cookie("token", token, cookieOptions).send({ status: "success" });
    });

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
