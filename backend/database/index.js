const { MongoClient } = require('mongodb');

// const url = "mongodb://localhost:27017"
const url = "mongodb+srv://admin:bopdz123@cluster0.vgvci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(url);
const db = {}


const connectToMongo = async () => {
    await client.connect();
    console.log("DB connected");
    const database = client.db("tmdb")
    db.users = database.collection("users")
    // db.rent = database.collection("rent")
    // db.purchase = database.collection("purchase")
}

module.exports = { connectToMongo, db }
