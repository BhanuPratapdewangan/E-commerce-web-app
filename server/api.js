
// import { MongoClient as Mongodb } from "mongodb";
// import express, { urlencoded } from "express";
// import cors from "cors";

// const connectionString = "mongodb://127.0.0.1:27017";

// const app = express();

// app.use(cors());
// app.use(urlencoded({extended:true}));
// app.use(express.json());

// // Get the user data in database
// app.get('/users', (req, res) => {

//     Mongodb.connect(connectionString).then(clientObject => {
//         var database = clientObject.db("shopping");
//         database.collection("users").find({}).toArray().then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })

// // Post the user data into database
// app.post('/userRegister', (req, res) => {

//     var data  = {
//         UserId : req.body.UserId,
//         UserName : req.body.UserName,
//         Password : req.body.Password,
//         Age : req.body.Age,
//         Email : req.body.Email,
//         Mobile : req.body.Mobile
//     } 

//     Mongodb.connect(connectionString).then(clientObject => {

//        var database =  clientObject.db("shopping");
//        database.collection("users").insertOne(data).then(document => {
//             res.send(document);
//             res.end();
//        })

//     })
// })


// // Fetch the products all data from database

// app.get('/products', (req, res) => {

//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         database.collection("products").find({}).toArray().then(documents => {

//             res.send(documents);
//             res.end();
//         })
//     })
// })

// // Fetch the specific products data from database

// app.get('/details/:id', (req, res) => {
//     var id = parseInt(req.params.id)
//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         database.collection("products").find({ProductId:id}).toArray().then(document => {

//             res.send(document);
//             res.end();
//         })
//     })
// })


// // Post or add the products into database

// app.post("/addproducts", (req, res) => {

//     var data = {
//         ProductId : parseInt(req.body.ProductId),
//         ProductName : req.body.ProductName,
//         Price : parseFloat(req.body.Price),
//         Stock : req.body.Stock,
//         CategoryName : req.body.CategoryName
//     }
//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         database.collection("products").insertOne(data).then(documents => {

//             res.send(documents);
//             // alert("Data Inserted...!");
//             res.end();
//         })
//     })
// })


// // Update products data in database

// app.put("/updateproduct/:id", (req, res) => {
//     Mongodb.connect(connectionString).then(clientObject => {
//         var id = parseInt(req.params.id);
//         var database = clientObject.db("shopping");
//         var findQuery = {ProductId: id}; 
//         var updateQuery = {$set: {ProductName:req.body.ProductName, Price:req.body.Price, Stock:req.body.Stock, CategoryNeme: req.body.CategoryName}}
//         database.collection("products").updateOne(findQuery,updateQuery).then(result => {

//             res.send(result);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
//             // res.redirect('/products');
//             console.log("Record Updated");
//             res.end();
//         })
//     })
// })


// // Update specific data in database

// app.patch("/updateoneproduct", (req, res) => {   

//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         var findQuery = {ProductId: parseInt(req.body.ProductId)};
//         var updateQuery = {$set: {ProductId:req.body.ProductId, ProductName:req.body.ProductName, Price:req.body.Price, Stock:req.body.Stock, CategoryNeme: req.body.CategoryName}}
//         database.collection("products").updateOne(findQuery,updateQuery).then(document => {

//             res.send(document);
//             res.redirect("/products");
//             res.end();
//         })
//     })
// })


// // Delete data from database

// app.delete("/deleteproduct/:id", (req, res) => {

//     var id = parseInt(req.params.id);
//     Mongodb.connect(connectionString).then(clientObject => {

//         var database = clientObject.db("shopping");
//         database.collection("products").deleteOne({ProductId:id}).then(() => {

//             console.log("Record Deleted");
//             res.redirect('/products');
//             res.end();
//         })
//     })
// })

// // app.listen(8080, () => {
// //     console.log(`Server Started http://localhost:8080`);
// // })

// app.connect((req, res) => {
//     res.writeHead(200, {'Content-Type':'application/json'});
//     res.end();
// })
// app.listen(8080, () => {
//     console.log(`Server started http://localhost:8080`);
// });


import express from "express";
import cors from 'cors';

// Import js files
import { } from './db/config.js';
import userModel from './db/user.js';
import productModel from './db/product.js';

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Get the user data in database
app.get('/users', async(req, res) => {
    
    let data = await userModel.find();
    if(data){
        res.send(data);
    } else {
        res.send('result : Data not found');
    }
})

// User SignUp API's
app.post('/userRegister', async(req, res) => {

    let data = new userModel(req.body);
    data = await data.save();
    data = data.toObject();
    delete data.Password;
    res.send(data);
    res.end();
});

// User Login API's
app.get('/login', async(req, res) => {

    if(req.body.Email && req.body.Password){

        let data = await userModel.find(req.body).select('-Password');

        if(data){
            res.send(data);
        } else{
            res.send('result : Data not match');
        }
    } else {
        res.send('result : Data not match');
    }
});

// Add Product API's
app.post('/addproducts', async(req, res) => {

    let data = new productModel(req.body);
    data = await data.save();
    res.send(data);
});

// Render Product list
app.get('/products', async(req, res) => {

    let data = await productModel.find();
    if(data.length > 0){
        res.send(data);
    } else {
        res.send("Data not found");
    }
});

// Fetch the specific product data from database
app.get('/details/:id', async(req, res) => {

    let data = await productModel.findOne({_id:req.params.id});
    if(data){
        res.send(data);
    } else {
        res.send('result : Data not found');
    }
});


// Update products 
app.put('/updateproduct/:id', async(req, res) => {

    let data = await productModel.updateOne({_id:req.params.id});
    if(data){
        res.send(data);
    } else {
        res.send("result : Data not found");
    }
})

// Delete Product
app.delete('/deleteproduct/:id', async(req, res) => {

    let data = await productModel.deleteOne({_id:req.params.id});
    res.send(data);
});

// Search Products
app.get('/searchproduct/:key', async(req, res) => {

    let data = await productModel.find(
        {
            "$or" : [
                {ProductName : {$regex:req.params.key}},
                {ProductId : {$regex:req.params.key}},
                {CategoryName : {$regex:req.params.key}},
                {Price : {$regex:req.params.key}}
            ]
        }
    );
    res.send(data);
})

// Listen port 8080 on server
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})

