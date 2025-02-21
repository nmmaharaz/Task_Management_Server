const express = require('express')
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vh6jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const usersCollection = client.db("TaskManagement").collection("user")
    const taskCollection = client.db("TaskManagement").collection("task")

    app.post("/users", async (req, res) => {
        const {email} = req.body;
        const quary = { email };
        const data = req.body;
        const addedData = await usersCollection.findOne(quary);
        if (addedData) return res.send("data all added db");
        const result = await usersCollection.insertOne(data);
        console.log("result", result)
        res.send(result);
      });
    app.get("/tasks", async (req, res) => {
        const result = await taskCollection.find().toArray();
        console.log("result", result)
        res.send(result);
      });
    app.post("/tasks", async (req, res) => {
        const quary = req.body;
        const result = await taskCollection.insertOne(quary);
        console.log("result", result)
        res.send(result);
      });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })