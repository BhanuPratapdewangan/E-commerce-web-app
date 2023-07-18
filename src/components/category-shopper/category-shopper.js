
import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// import {} from '../details-shopper/details-shopper.js'

const CategoryShopping = () => {
    const [categories, setCategory] = useState([]);
    const params = useParams();
    const cname = params.catname;
    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {

        if (cookies["userId"] == undefined) {
            navigate('/login');
        }
        axios({
            method: "GET",
            url: `https://fakestoreapi.com/products/category/${params.catname}`
        })
            .then(response =>
                setCategory(response.data)
            )
    }, [params.catname]);

    return (
        <div>
            <h3>Shopper Category {cname}</h3>
            <div className="d-flex flex-wrap justify-content-between">
                {
                    categories.map(category =>
                        <div className="card p-2 m-2" key={category.id} style={{ width: '250px' }}>
                            <img src={category.image} className="card-img-top" style={{ height: '250px' }}></img>
                            <div className="card-header mt-1" style={{ height: '200px' }}>
                                <p>{category.title}</p>
                            </div>
                            <div className="card-footer text-center mb-0">
                                <Link to={'/details/' + category.id} className="btn btn-primary">Get Details</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CategoryShopping;