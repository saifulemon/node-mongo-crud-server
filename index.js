const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 4000;

// use middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('running my crud server');
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

    app.post("/user", (req, res) => {
        const newUser = req.body;
        console.log('adding new user: ', newUser);
        res.send({result: 'success'});
    });
  } finally {

  }
}

run().catch(console.dir);

// user: mongouser01
// password: Q4z2BO7PkOj7Cd3r
