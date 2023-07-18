
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
const PrivateShopper = () => {

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    const auth = cookies["userId"];
    auth ? <Outlet /> : <navigate to='/login' />
   
}

export default PrivateShopper;