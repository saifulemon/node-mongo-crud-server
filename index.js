const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = 4000;

// use middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("running my crud server");
});

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});

const uri =
  "mongodb+srv://mongouser01:Q4z2BO7PkOj7Cd3r@cluster0.6g18drj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("FoodExpress").collection("user");

    // get user: add a client side
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // POST user : add a new user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("adding new user: ", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // Update user
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await userCollection.findOne(query)
      res.send(result);
    });

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
            name: updateUser.name,
            email: updateUser.email
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    // DELETE user : remove a user
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

// user: mongouser01
// password: Q4z2BO7PkOj7Cd3r
