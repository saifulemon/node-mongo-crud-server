const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 4000;


app.get('/', (req, res) => {
    res.send('running my crud server');
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});



const uri = "mongodb+srv://mongouser01:Q4z2BO7PkOj7Cd3r@cluster0.6g18drj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();
        const userCollection = client.db("FoodExpress").collection("user");
        const user = {name: "SI Emon", email: "siemon1257@gmail.com"};
        const result = await userCollection.insertOne(user);
        console.log(`user inserted with id: ${result.insertedId}`);
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)




// user: mongouser01
// password: Q4z2BO7PkOj7Cd3r