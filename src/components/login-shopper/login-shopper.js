
import axios from "axios";
import { useFormik,Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';
const LoginShopper = () => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate  = useNavigate();
    return(
        <div>
            <h2>User Login</h2>
            <Formik
                initialValues={{
                    "UserId" : "",
                    "Password" : ""
                }}

                validationSchema={
                    yup.object({
                        UserId: yup.string().required("UserId required"),
                        Password: yup.string().required("Password required").matches(/(?=.*[A-Z])\w{4,15}/, "Password 4 to 15 character with atleast one uppercase letter")
                    })
                }

                onSubmit={(values) => {
                    axios({
                        method:"get",
                        url:"http://localhost:8080/login"
                    })
                    .then(response => {
                        for(var user of response.data)
                        {
                            if(user.UserId==values.UserId && user.Password==values.Password)
                            {
                                setCookies("userId", values.UserId);
                                navigate('/home');
                                break;
                            } else
                            {
                                navigate('/invalid');
                            }
                        }
                    })
                }}
            >
                <Form>
                    <dl>
                        <dt>User Id</dt>
                        <dd><Field type="text" name="UserId"  /></dd>
                        <dd className="text-danger"><ErrorMessage name="UserId"/></dd>
                        <dt>Password</dt>
                        <dd><Field type="password" name="Password"/></dd>
                        <dd className="text-danger"><ErrorMessage name="Password"/></dd>
                    </dl>
                    <button type="submit" className="btn btn-success">Login</button>
                    <div className="mt-3">
                        <Link to='/register'>New User?Register</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginShopper;