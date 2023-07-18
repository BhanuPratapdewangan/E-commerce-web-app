
import React from "react";
import './index-shopper.css';

import {useNavigate, Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import { useEffect } from "react";

const IndexShopper = () => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();
    const cookie = cookies["userId"];

    useEffect(() => {
        if(cookies["userId"]==undefined)
        {
            navigate('/home');
        } else 
        {
            navigate('/home');
        }
    },[cookies]);

    const logout = () => {
        removeCookies("userId");
        navigate('/home'); 
    }

    return(
        <div>
            <div className="d-flex flex-wrap mt-2 pt-2 justify-content-between">
                <div>
                    <h2 className="ms-2">Shopper</h2>
                </div>
                
            <div className="d-flex">
                        
            {    cookie ? 
                <div>
                    <header className="d-flex flex-wrap">
                        <div className="ms-3 btn"><Link to='/' className="link"></Link></div>
                        <div className="ms-3 btn"><Link to='home' className="link">Home</Link></div>
                        <div className="ms-3 btn"><Link to='productgrid' className="link">Products</Link></div>
                        <div className="ms-3 btn"><Link to="category/men's clothing" className="link">Men's clothing</Link></div>
                        <div className="ms-3 btn"><Link to="category/women's clothing" className="link">Women's clothing</Link></div>
                        <div className="ms-3 btn"><Link to="category/jewelery" className="link">Jewellery</Link></div>
                        <div className="ms-3 btn"><Link to="category/electronics" className="link me-5">Electronics</Link></div>
                        <div className="ms-3 btn"><Link to="register" onClick={logout} className="link">Logout [{cookies["userId"]}]</Link></div>

                        <div className="ms-4 me-5 mt-2">
                            <span className="bi bi-search ms-3"></span>
                            <span className="bi bi-person ms-3"></span>
                            <span className="bi bi-heart ms-3"></span>
                            <span className="bi bi-cart3 ms-3"></span>
                        </div>
                    </header>
                </div>

                :

                <div>
                    <header className="d-flex flex-wrap mt-2 me-5">
                        <div className="ms-3"><Link to="register" className="link">Register</Link></div>
                        <div className="ms-3"><Link to="login" className="link">Login</Link></div>  
                        <div className="ms-3"><Link to="invalid" className="link"></Link></div>  
                    </header>
                </div>
             }
            </div>
            </div>

            <section>
                <main>
                    <div className="mt-4 bg-dark text-white p-2 text-center">
                        ⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️
                    </div>
                </main>
            </section>
        </div>

        
    )
}

export default IndexShopper;