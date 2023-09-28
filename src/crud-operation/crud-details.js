
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CrudDetails = () => {

    const params = useParams();
    const [product, setProductDetails] = useState([{ProductId:0, ProductName:'', Price:0, Stock:false, CategoryName:''}]);

    useEffect(() => {
        axios({
            method:"get",
            url:`http://localhost:5500/details/${params.id}`
        }).then(response => {
            setProductDetails(response.data);
        })
    },[])
    return(
        <div className="m-4">
            <h2>Product Details</h2>
            <dl>
                <dt>Product Name</dt>
                <dd>{product[0].ProductName}</dd>
                <dt>Price</dt>
                <dd>{product[0].Price}</dd>
                <dt>Stock</dt>
                <dd>{(product[0].Stock==true)?"Available":"Out of Stock"}</dd>
                <dt>Category Name</dt>
                <dd>{product[0].CategoryName}</dd>
            </dl>
            <Link to="/productgrid">Back to product</Link>
        </div>
    )
}

export default CrudDetails;