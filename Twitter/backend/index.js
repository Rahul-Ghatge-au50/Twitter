require('dotenv').config();
const express = require('express');
const app = express();
const Port = 5000 || process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c8zsamg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        //connect client to server;
        await client.connect();
        console.log("You successfully connected to MongoDB!");

        const postCollection = client.db('twitter_database').collection('posts');  //this is post collection;
        const userCollection = client.db('twitter_database').collection('users');  //this is user collection;


        //to get all post
        app.get('/post', async (req, res) => {
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        })


        //to get specific user post 
        app.get('/userPost', async (req, res) => {
            const email = req.query.email;
            const post = (await postCollection.find({email:email}).toArray()).reverse();
            res.send(post);
        })

        //to create post
        app.post('/post', async (req,res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result); 
        })

        //Users get and post route
        app.post('/signUp',async(req,res) => {
            const userData = req.body;
            const user = await userCollection.insertOne(userData);
            res.send(user);
        })

        app.get('/users',async (req,res) => {
            const users = await userCollection.find().toArray();
            res.send(users);
        })

        app.get('/loggedUser',async (req,res) => {
            const email = req.query.email
            const user = await userCollection.findOne({email:email});
            //console.log(email);
            //console.log(user);
            res.send(user);
        })


        app.patch('/userUpdates/:email',async (req,res) => {
            const filter = req.params;
            const profile = req.body;
            const updateDoc = {$set:profile};
            const options = {upsert:true};
            const result = await userCollection.updateOne(filter,updateDoc,options);
            res.send(result);
        })
    } catch (error) {
        console.log(error);
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);



// const connect = async () => {
//     try{
//         await mongoose.connect('mongodb+srv://rahulghatge166:Rahul210519@cluster0.c8zsamg.mongodb.net/?retryWrites=true&w=majority');
//         console.log('Connected to MongoDB');
//     }catch(error){
//         throw error
//     }
// };


app.listen(Port, () => {
    console.log(`Listing at port no ${Port}`);
    //connect();
})