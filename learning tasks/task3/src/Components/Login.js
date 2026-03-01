import React, { useContext } from 'react'
import Navbar from './FormComponets/Navbar'
import { useState } from 'react'
import axios from 'axios'
import Main from './Main'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BgContext } from '../App'
import { AuthContext } from './Auth'
import Cookies from 'js-cookie'
import ProtectedRoute from './ProtectedRoute'


// logic of the extra sign up button
function SignUp() {
    const navigate = useNavigate();

    const signUp = () => {
        navigate('/', { replace: true })
    }
    return (
        <button className='btn btn-primary' onClick={signUp}>Sign Up</button>
    )
}

export function LoginComponents() {

    //importing all neccessary states
    const { bg, obg, setBg, setobg } = useContext(BgContext);
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }
    const changePass = (event) => {
        setPassword(event.target.value);
    }
    const navigate = useNavigate();

    const loginbtn = () => {
        axios.post("https://auth-backend-138t.onrender.com/api/v1/users/login", {
            "username": `${username}`,
            "password": `${password}`
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Login successful")
                const token = res.data.data.accessToken;
                if (token) {
                    Cookies.set('authtoken', token, { expires: 7 });

                    login({ username, token })
                    setTimeout(() => {
                        navigate("/mainpage", { replace: true })
                    }, 2000);
                }
            }
            else {
                throw new Error("");
            }
        }).catch((error) => {
            toast.error("Wrong username and password");
        })
    }

    return (
        <>
            <Navbar setBg={setBg} setobg={setobg} title="Login" extra={<SignUp />} />
            <div className="outerbox" style={obg}>
                <div className="login" style={bg}>

                    <div className="input-group mb-3 l-option">
                        <span className="input-group-text bold" id="inputGroup-sizing-default">
                            Username
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id=""
                            placeholder="Enter your username"
                            value={username}
                            onChange={changeUsername}
                        />
                    </div>
                    <div className="input-group mb-3 l-option">
                        <span className="input-group-text bold" id="inputGroup-sizing-default">
                            Password
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id=""
                            placeholder="Enter password"
                            value={password}
                            onChange={changePass}
                        />
                    </div>
                    <button type="button" className='btn btn-primary' onClick={loginbtn}>Login</button>

                </div>
            </div>
        </>
    )
}


export default function Login() {

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<LoginComponents />} />
                <Route path="/mainpage" element={<ProtectedRoute><Main /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

