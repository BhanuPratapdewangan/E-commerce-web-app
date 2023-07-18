
import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from "express";
import cors from "cors";

const connectionString = "mongodb://127.0.0.1:27017";

const app = express();

app.use(cors());
app.use(urlencoded({extended:true}));
app.use(express.json());

// Get the user data in database
app.get('/users', (req, res) => {

    Mongodb.connect(connectionString).then(clientObject => {
        var database = clientObject.db("shopping");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

// Post the user data into database
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


// Fetch the products all data from database

app.get('/products', (req, res) => {

    Mongodb.connect(connectionString).then(clientObject => {

        var database = clientObject.db("shopping");
        database.collection("products").find({}).toArray().then(documents => {

            res.send(documents);
            res.end();
        })
    })
})

// Fetch the specific products data from database

app.get('/details/:id', (req, res) => {
    var id = parseInt(req.params.id)
    Mongodb.connect(connectionString).then(clientObject => {

        var database = clientObject.db("shopping");
        database.collection("products").find({ProductId:id}).toArray().then(document => {

            res.send(document);
            res.end();
        })
    })
})


// Post or add the products into database

app.post("/addproducts", (req, res) => {

    var data = {
        ProductId : parseInt(req.body.ProductId),
        ProductName : req.body.ProductName,
        Price : parseFloat(req.body.Price),
        Stock : req.body.Stock,
        CategoryName : req.body.CategoryName
    }
    Mongodb.connect(connectionString).then(clientObject => {

        var database = clientObject.db("shopping");
        database.collection("products").insertOne(data).then(documents => {

            res.send(documents);
            // alert("Data Inserted...!");
            res.end();
        })
    })
})


// Update products data in database

app.put("/updateproduct/:id", (req, res) => {
    Mongodb.connect(connectionString).then(clientObject => {
        var id = parseInt(req.params.id);
        var database = clientObject.db("shopping");
        var findQuery = {ProductId: id}; 
        var updateQuery = {$set: {ProductName:req.body.ProductName, Price:req.body.Price, Stock:req.body.Stock, CategoryNeme: req.body.CategoryName}}
        database.collection("products").updateOne(findQuery,updateQuery).then(result => {

            res.send(result);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            // res.redirect('/products');
            console.log("Record Updated");
            res.end();
        })
    })
})


// Update specific data in database

app.patch("/updateoneproduct", (req, res) => {   

    Mongodb.connect(connectionString).then(clientObject => {

        var database = clientObject.db("shopping");
        var findQuery = {ProductId: parseInt(req.body.ProductId)};
        var updateQuery = {$set: {ProductId:req.body.ProductId, ProductName:req.body.ProductName, Price:req.body.Price, Stock:req.body.Stock, CategoryNeme: req.body.CategoryName}}
        database.collection("products").updateOne(findQuery,updateQuery).then(document => {

            res.send(document);
            res.redirect("/products");
            res.end();
        })
    })
})


// Delete data from database

app.delete("/deleteproduct/:id", (req, res) => {

    var id = parseInt(req.params.id);
    Mongodb.connect(connectionString).then(clientObject => {

        var database = clientObject.db("shopping");
        database.collection("products").deleteOne({ProductId:id}).then(() => {

            console.log("Record Deleted");
            res.redirect('/products');
            res.end();
        })
    })
})

// app.listen(8080, () => {
//     console.log(`Server Started http://localhost:8080`);
// })

app.connect((req, res) => {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end();
})
app.listen(8080, () => {
    console.log(`Server started http://localhost:8080`);
});