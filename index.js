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
    origin: "http://localhost:3000", // Adjust if needed
    methods: ["GET", "POST", "PUT"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
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
    await client.connect(); // Connect to DB
    console.log("Connected to MongoDB");

    const usersCollection = client.db("TaskManagement").collection("user");
    const taskCollection = client.db("TaskManagement").collection("task");

    // Create User
    app.post("/users", async (req, res) => {
      const { email } = req.body;
      const query = { email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) return res.send("User already exists");
      const result = await usersCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/tasks", async (req, res) => {
      const {email} = req.query;
      const tasks = await taskCollection.find({email}).toArray();
      res.send(tasks);
    });

    app.post("/tasks", async (req, res) => {
      const result = await taskCollection.insertOne(req.body);
      io.emit("taskUpdated", await taskCollection.find().toArray()); // Broadcast update
      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { category } = req.body;
      console.log("update task category", id, category);
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
      console.log("update task", id);
      const updateData = req.body;
      console.log("updateData", updateData);
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      console.log("Task updated", result);
      res.send(result);
    });

    // Real-time Socket.io Connection
    io.on("connection", (socket) => {
      // console.log("New client connected");

      // Send initial task data
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

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
