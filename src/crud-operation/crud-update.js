
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";


const CrudUpdate = () => {

    const [product, setProduct] = useState([{ ProductId: 0, ProductName: '', Price: 0, Stock: false, CategoryName: '' }]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5500/details/${params.id}`
        }).then(response => {
            setProduct(response.data);
        })
    }, []);

    // const updateProduct = async (values, { setSubmitting }) => {
    //     try {
    //         await axios({
    //             method: "put",
    //             url: `http://localhost:5500/updateproduct/${params.id}`,
    //             data: values
    //         }).then(() => {
    //             // console.log("Product Updated");
    //             navigate('/productgrid');
    //         })
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    //     finally {
    //         setSubmitting(true);
    //     }
    // }


    return (
        <div className="m-4">
            <h2>Update Product</h2>
            <Formik

                initialValues={{
                    ProductId: 0,
                    ProductName: " ",
                    Price: 0,
                    Stock: false,
                    CategoryName: " "
                }}

                onSubmit={(values) =>
                    axios({
                        method: "put",
                        url: `http://localhost:5500/updateproduct/${params.id}`,
                        data: values
                    }).then(() => {
                        // console.log("Product Updated");
                        navigate('/productgrid');
                    })
                }
            >
                {
                    <Form className="mt-4">
                        <dl>
                            <dt>Product Name</dt>
                            {/* <dd>{product[0].ProductName}</dd> */}
                            <dd><Field type="text" className="form-control w-25" name="ProductName" value={product[0].ProductName} onChange={(e) => setProduct(e.target.value)} /></dd>
                            <dt>Price</dt>
                            <dd><Field type="number" className="form-control w-25" name="Price" value={product[0].Price} onChange={(e) => setProduct(e.target.value)} /> </dd>
                            <dt>Stock</dt>
                            <dd><Field type="checkbox" className="form-check-input" name="Stock" value={(product[0].Stock == true) ? <input type="checkbox" value={product[0].Stock} /> : <input type="checkbox" value={product[0].Stock} />} onChange={(e) => { setProduct(e.target.value) }} /></dd>
                            <dt>Category Name</dt>
                            <dd><Field type="text" className="form-control w-25" name="CategoryName" value={product[0].CategoryName} onChange={(e) => setProduct(e.target.value)} /></dd>
                        </dl>
                        <button type="submit" className="btn btn-primary form-control w-25">Update Product</button>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default CrudUpdate;