import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logined Successfully", "success");
            history("/");
        }
        else {
            props.showAlert("invalid credentials", "danger");

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <h2 className='mt-3'>Login to Compare Your Products</h2>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><h5>Email address:</h5></label>
                        <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="email" />
                        <div id="emailHelp" className="form-text-small">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><h5>Password:</h5></label>
                        <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password' />
                    </div>
                    <button type="submit" className="btn btn-primary" to="/SearchItem">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
