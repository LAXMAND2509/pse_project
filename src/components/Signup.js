import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
const Signup = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        if(!check()){props.showAlert("check password", "danger"); return ;}
        const { name, email, password, cpassword } = credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if ( json.success) {
            console.log(json);
            localStorage.setItem('token', json.authtoken)
            history("/");
            props.showAlert("Account Created Successfully", "success");
        }
        else {
            props.showAlert("invalid credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    function check() {
        if (credentials.password === credentials.cpassword) {
            return true;
        }
        else {
            return false;
        }
    }
    return (
        <>
            <div className='container my-3'>
                <h2 className='my-4'>Signup to Continue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"><h5>Name:</h5></label>
                        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"><h5>Email address:</h5></label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"><h5>Password:</h5></label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword"><h5>Confirm Password:</h5></label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} focusout={check()} placeholder="Password" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
