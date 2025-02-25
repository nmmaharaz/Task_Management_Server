const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://taskmanagement-8ad05.web.app",
      "https://taskmanagement-8ad05.firebaseapp.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vh6jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); 
    console.log("Connected to MongoDB");
    const taskCollection = client.db("TaskManagement").collection("task");

    app.get("/tasks/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        console.log("Fetching tasks for email:", email);
        const result = await taskCollection.find(query).toArray();
        console.log("Tasks:", result);
        res.json(result);
    });

    app.post("/tasks", async (req, res) => {
      console.log("add new task", req.body);
      const result = await taskCollection.insertOne(req.body);
      io.emit("taskUpdated", await taskCollection.find().toArray()); // Broadcast update
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { category } = req.body;
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { category } }
      );

      io.emit("taskUpdated", await taskCollection.find().toArray()); // Broadcast update
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/task/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    });
    io.on("connection", (socket) => {

      taskCollection
        .find()
        .toArray()
        .then((tasks) => {
          socket.emit("taskUpdated", tasks);
        });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Server running on `);
});
