
import React from "react";
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const CrudIndex = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5500/products"
        }).then(response => {
            setProducts(response.data);
        })
    }, [products]);

    const DeleteClick = async (e) => {

        const id = parseInt(e.currentTarget.value);
        // console.log(id);
        const flag = window.confirm("Are you sure\nWant to delete");
        if (flag == true) {
            await axios({
                method: "delete",
                url: `http://localhost:5500/deleteproduct/${id}`
            }).then(() => {
                alert("Record Deleted");
                navigate('/productgrid');
            }).catch((error) => {
                console.error(error);
            })

        }
    }
    return (
        <div>
            <h2 className="m-4">Products Grid</h2>
            <div className="m-4">
                <Link to="/addproducts" className="btn btn-primary">Add a products </Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product =>
                            <tr key={product.ProductId}>
                                <td>{product.ProductName}</td>
                                <td>
                                    <Link to={"/cruddetails/" + product.ProductId} className="btn btn-info"><span className="bi bi-eye"></span></Link>
                                </td>
                                <td>
                                    <Link to={"/crudupdate/" + product.ProductId} className="btn btn-warning"><span className="bi bi-pen"></span></Link>
                                </td>
                                <td>
                                    <button value={product.ProductId} onClick={DeleteClick} className="btn btn-danger"><span className="bi bi-trash"></span></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CrudIndex;