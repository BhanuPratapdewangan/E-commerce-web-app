import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    ProductId : Number,
    ProductName : String,
    Price : Number,
    Stock : Boolean,
    CategoryName : String
})

const productModel = mongoose.model("products", productSchema);

export default productModel;