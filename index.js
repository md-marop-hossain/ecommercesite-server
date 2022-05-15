const express = require('express');
const app = express();
// middleware 
const cors = require('cors');
var ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const uri = "mongodb+srv://ecommerce:1BLck8vxAgdY4ZXF@cluster0.2uukv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {

        await client.connect();
        const database = client.db('ecommerce');
        const laptopCollection = database.collection('laptop');
        const monitor = database.collection('monitorCollection');
        const softwareCollection = database.collection('software');
        const tablet = database.collection('tabletCollection');
        const networkingCollection = database.collection('networking');
        const desktopCollection = database.collection('desktop');
        const upsCollection = database.collection('ups');
        const componentCollection = database.collection('component');
        const cameraCollection = database.collection('camera');
        const tvCollection = database.collection('tv');
        const gamingCollection = database.collection('gaming');
        const speaker = database.collection('speakerCollection');
        const usersCollection = database.collection('users');
        const ordersCollection = database.collection("orders");
        const reviewsCollection = database.collection('reviews');
        const contactInfoCollection = database.collection('contact');

        app.post('/contact', async (req, res) => {
            const order = req.body;
            const result = await contactInfoCollection.insertOne(order);
            res.json(result);
        })
        app.get('/contact', async (req, res) => {
            const cursor = contactInfoCollection.find({});
            const contacts = await cursor.toArray();
            res.send(contacts);
        })
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.json(result);
        })

        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.json(result);
        })

        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        })
        app.get('/orders/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.findOne(query);
            res.json(result);
        })
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const payment = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    payment: payment
                }
            };
            const result = await ordersCollection.updateOne(filter, updateDoc);
            res.json(result);
        })
        //DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            console.log("id", id);
            const query = { _id: ObjectID(id) }
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })
        //UPDATE API
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectID(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: "shipped"
                },
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        })

        //DELETE API
        app.delete('/monitorCollection/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await monitor.deleteOne(query);
            res.json(result);
        })

        // post method 
        app.post('/laptop', async (req, res) => {
            const order = req.body;
            const result = await laptopCollection.insertOne(order);
            res.json(result);
        })
        app.post('/monitorCollection', async (req, res) => {
            const order = req.body;
            const result = await monitor.insertOne(order);
            res.json(result);
        })
        app.post('/speakerCollection', async (req, res) => {
            const order = req.body;
            const result = await speaker.insertOne(order);
            res.json(result);
        })
        app.post('/software', async (req, res) => {
            const order = req.body;
            const result = await softwareCollection.insertOne(order);
            res.json(result);
        })
        app.post('/tabletCollection', async (req, res) => {
            const order = req.body;
            const result = await tablet.insertOne(order);
            res.json(result);
        })
        app.post('/networking', async (req, res) => {
            const order = req.body;
            const result = await networkingCollection.insertOne(order);
            res.json(result);
        })
        app.post('/desktop', async (req, res) => {
            const order = req.body;
            const result = await desktopCollection.insertOne(order);
            res.json(result);
        })
        app.post('/ups', async (req, res) => {
            const order = req.body;
            const result = await upsCollection.insertOne(order);
            res.json(result);
        })
        app.post('/component', async (req, res) => {
            const order = req.body;
            const result = await componentCollection.insertOne(order);
            res.json(result);
        })
        app.post('/camera', async (req, res) => {
            const order = req.body;
            const result = await cameraCollection.insertOne(order);
            res.json(result);
        })
        app.post('/tv', async (req, res) => {
            const order = req.body;
            const result = await tvCollection.insertOne(order);
            res.json(result);
        })
        app.post('/gaming', async (req, res) => {
            const order = req.body;
            const result = await gamingCollection.insertOne(order);
            res.json(result);
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        })
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;

            }
            res.json({ admin: isAdmin });
        })
        // get method 
        app.get('/laptop', async (req, res) => {

            const cursor = laptopCollection.find({});
            const laptop = await cursor.toArray();
            res.send(laptop);
        })
        app.get('/monitorCollection', async (req, res) => {

            const cursor = monitor.find({});
            const monitorr = await cursor.toArray();
            res.send(monitorr);
        })
        app.get('/speakerCollection', async (req, res) => {

            const cursor = speaker.find({});
            const speakerr = await cursor.toArray();
            res.send(speakerr);
        })
        app.get('/software', async (req, res) => {

            const cursor = softwareCollection.find({});
            const software = await cursor.toArray();
            res.send(software);
        })
        app.get('/tabletCollection', async (req, res) => {

            const cursor = tablet.find({});
            const tablett = await cursor.toArray();
            res.send(tablett);
        })
        app.get('/networking', async (req, res) => {

            const cursor = networkingCollection.find({});
            const networking = await cursor.toArray();
            res.send(networking);
        })
        app.get('/desktop', async (req, res) => {

            const cursor = desktopCollection.find({});
            const desktop = await cursor.toArray();
            res.send(desktop);
        })
        app.get('/ups', async (req, res) => {

            const cursor = upsCollection.find({});
            const ups = await cursor.toArray();
            res.send(ups);
        })
        app.get('/component', async (req, res) => {

            const cursor = componentCollection.find({});
            const component = await cursor.toArray();
            res.send(component);
        })
        app.get('/camera', async (req, res) => {

            const cursor = cameraCollection.find({});
            const camera = await cursor.toArray();
            res.send(camera);
        })
        app.get('/tv', async (req, res) => {

            const cursor = tvCollection.find({});
            const tv = await cursor.toArray();
            res.send(tv);
        })
        app.get('/gaming', async (req, res) => {

            const cursor = gamingCollection.find({});
            const gaming = await cursor.toArray();
            res.send(gaming);
        })
        app.post('/create-payment-intent', async (req, res) => {
            const paymentInfo = req.body;
            console.log("paymentinfo", paymentInfo);
            const amount = paymentInfo.regularPrice * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                payment_method_types: [
                    'card'
                ]

            })
            res.json({ clientSecret: paymentIntent.client_secret })
        })
    }
    // catch {

    // }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("hello");
});
app.listen(port, () => {
    console.log(`listening at ${port}`);
})