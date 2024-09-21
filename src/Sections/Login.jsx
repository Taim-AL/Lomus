
import React, { useState, useRef, useEffect } from 'react';
import '../Assets/css/SingUp.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import axios from "../API/Axios"
import AlertDismissibleExample from '../Components/Alert';
import Loder from '../Components/Loder';
import useAuth from '../Components/hooks/useAuth';

function Login() {

    const { auth, setAuth, persist, setPersist } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ name: "", message: "" });
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setError('');
    }, [email, password])

    const Navigate = useNavigate();
    const Location = useLocation();
    const from = Location.state?.from?.pathname || "/home/main";

    const handelLogin = async (event) => {
        event.preventDefault();
        setPending(true);
        try {
            await axios.post('/teacher/login',
                JSON.stringify({ contact: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(response => {
                if (response.data.success === true) {
                    const accessToken = response?.data?.data?.token;
                    setAuth(prev => {
                        console.log(JSON.stringify(prev))
                        return {
                            ...prev,
                            email: email,
                            password: password,
                            accessToken: accessToken
                        }
                    });

                    console.log(auth);
                    if (persist === true) {
                        localStorage.setItem("token", accessToken);
                    }
                    setPending(false);
                    setEmail("");
                    setPassword("");
                    Navigate(from, { replace: true });
                    console.log(response.data);
                }
            })

        } catch (e) {
            console.log(e);
            setError({ name: "error", message: e.response.data.message });
            setPending(false);
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
        if (persist === false) {
            localStorage.setItem("token", "");
        }
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);

    }, [persist])

    return (
        <>
            {isPending ? <Loder /> :
                <div className="body">
                    <div className="background"></div>
                    <div className="card">
                        <SchoolIcon className='logo' />
                        <h2>Welcome Back</h2>
                        <form className='form' onSubmit={handelLogin}>
                            <input
                                type="text"
                                value={email}
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Phone or Email'
                                className='input-1'
                                required />

                            <input
                                type="password"
                                value={password}
                                autoComplete='off'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='input-1'
                                required />
                            <div className="container-trust-device">
                                <input
                                    type="checkbox"
                                    id='pesist'
                                    onChange={togglePersist}
                                    checked={persist}
                                    className='trust-button'
                                />
                                <label htmlFor="" className='label-trust-device'>
                                    Trust This Device
                                </label>
                            </div>
                            <button disabled={!email || !password}>Login</button>
                        </form>
                        {error ? <AlertDismissibleExample name={error.name} errRef={errRef} message={error.message} /> : ""}
                        <footer>
                            Forgot Your Password ?
                            <Link style={{ color: "rgb(245, 144, 122)" }} to={"/forget"}>   here</Link>
                        </footer>
                    </div>
                </div>
            }
        </>
    );
}

export default Login;