
import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());


const connectionString = "mongodb://127.0.0.1:27017";

app.get('/', (req, res) => {
    res.write("Hi... Developers");
    res.end();
})

// Fetch the data from database 

app.get('/users', (req, res) => {

    Mongodb.connect(connectionString).then(clientObject => {
        var database = clientObject.db("shopping");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

// Post the data into database
app.post('/userRegister', (req, res) => {

    var data  = {
        UserId : req.body.UserId,
        UserName : req.body.UserName,
        Password : req.body.Password,
        Age : req.body.Age,
        Email : req.body.Email,
        Mobile : req.body.Mobile
    } 

    Mongodb.connect(connectionString).then(clientObject => {

       var database =  clientObject.db("shopping");
       database.collection("users").insertOne(data).then(document => {
            res.send(document);
            res.end();
       })

    })
})

// app.get('/userLogin', (req, res) => {

//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         database.collection("users").find({}).toArray().then(document => {
            
//         })
//     })
// })

// app.delete('/deleteUser/:id', (req, res) => {

//     Mongodb.connect(connectionString).then(clientObject => {
//         var database = clientObject.db("shopping");
//         database.collection("users").deleteOne({}).then(document => {
//             res.send(document)
//             res.end();
//         })
//     })
// })

app.listen(4000, () => {
    console.log(`Server started to this URL http://localhost:4000`);
});