
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const CrudCreate = () => {

    const [products, setProducts] = useState([]);
    const [productError, setProductError] = useState('');
    const [color, setColor] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5500/products"
        }).then(response => {
            setProducts(response.data);
        })
    }, [])

    const verifyProductId = (e) => {
        var id = parseInt(e.target.value)
        for (var product of products) {
            if (product.ProductId == id) {
                setProductError("ProductId Taken - Try another");
                setColor("red");
                break;
            } else {
                setProductError("Product Id Available");
                setColor("green");
            }
        }
    }
    return (
        <div>
            <h2 className="m-4">Add Product</h2>
            <Formik

                initialValues={
                    {
                        ProductId: 0,
                        ProductName: "",
                        Price: 0,
                        Stock: false,
                        CategoryName: ""
                    }}

                validationSchema={
                    yup.object({
                        ProductId: yup.number().required("Product Id required"),
                        ProductName: yup.string().required("Product Name required"),
                        Price: yup.number().required("Price required"),
                        Stock: yup.bool().required("Once a time see stock is available or not"),
                        CategoryName: yup.string().required("Category Name required")
                    })
                }

                onSubmit={(values) =>
                    axios({
                        method: "post",
                        url: "http://localhost:5500/addproducts",
                        data: values
                    }).then(() => {
                        alert("Added Successfully...!");
                        navigate("/productgrid");
                    })
                }

            >
                {
                    <Form>
                        <dl>
                            <dt>ProductId</dt>
                            <dd><Field name="ProductId" onKeyUp={verifyProductId} type="number" /></dd>
                            <dd className="text-danger"><ErrorMessage name="ProductId" /></dd>
                            <dd style={{ color: color }}>{productError}</dd>

                            <dt>ProductName</dt>
                            <dd><Field name="ProductName" type="text" /></dd>
                            <dd className="text-danger"><ErrorMessage name="ProductName" /></dd>

                            <dt>Price</dt>
                            <dd><Field name="Price" type="number" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Price" /></dd>

                            <dt>Stock</dt>
                            <dd className="form-switch"><Field name="Stock" type="checkbox" className="form-check-input" /></dd>
                            <dd className="text-danger"><ErrorMessage name="Stock" /></dd>

                            <dt>CategoryName</dt>
                            <dd><Field name="CategoryName" type="text" /></dd>
                            <dd className="text-danger"><ErrorMessage name="CategoryName" /></dd>

                        </dl>
                        <button type="submit" className="btn btn-primary"> Add Product</button>
                        <Link to="/productgrid" className="ms-3"> View Details</Link>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default CrudCreate;