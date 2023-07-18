
import axios from "axios";
import { useState ,useEffect } from "react";


const MensShopper = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios({
            method:"GET",
            url:"https://fakestoreapi.com/products/category/men's clothing",
        })
        .then(response => {
            setProducts(response.data);
        })
    },[]);

    return(
        <div className="container-fluid">
            <h3>Men's Shopper component</h3>
            <div className="d-flex flex-wrap justify-content-between">
                {
                    products.map(product => 
                        <div className="card" style={{width:'200px'}}>
                            <img src={product.image} alt="men's_product" style={{height:'300px'}} className="card-img-top"></img>
                            <div className="card-header">
                                <p>{product.title}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MensShopper;