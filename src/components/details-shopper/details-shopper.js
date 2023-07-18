
import axios from "axios";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

const DetailsShopper = () => {

    const [product, setProduct] = useState({id:0, title:'', price:0, rating:{rate:0, count:0}});
    const params = useParams();

    useEffect(() => {
        axios({
            method:"GET",
            url:`https://fakestoreapi.com/products/${params.id}`
        }).then(response => {
            setProduct(response.data);
        })
    },[])
    return(
        <div>
            <h2>Details</h2>
            <div className="row ms-4 mt-4">
                <div className="col-3">
                    <img src={product.image} width={150} height={150} />
                </div>
                <div className="col-9">
                    <dl>
                        <dt>Title</dt>
                        <dd>{product.title}</dd>
                        <dt>Price</dt>
                        <dd> {product.price}</dd>
                        <dt>Rating</dt>
                        <dd><span className="bi bi-star-fill text-success"> {product.rating.rate} [{product.rating.count}]</span></dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default DetailsShopper;