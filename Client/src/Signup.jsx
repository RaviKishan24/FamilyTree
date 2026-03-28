import  { useState } from 'react'
import logo from "./assets/logo.png"
import TextField from '@mui/material/TextField';

import "./Signup.css"

function Signup() {
    const [atLogin, setAtLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPasswod, setConfirmPassword] = useState("");

    if (password != confirmPasswod) {
        toast.error("Password does not matched ")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("password", password);
    }


    return (
        
        <div className='signup_ContainerS'>
            {/* condition ? value_if_true : value_if_false */}

            <div className='signup_form'>
                <img
                    className='head_Img'
                    src={logo}alt="Logo"
                />

                <h1>  Preserving Family Stories for Generations</h1>
                <p>{atLogin ? ("Login to explore Our platform that helps you create, organize, and share your family tree in a secure and beautiful way") : ("Signup to explore Our platform that helps you create, organize, and share your family tree in a secure and beautiful way")}</p>

                <form className='signUp_inputs' onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email Address' required />
                    {atLogin ? " " : <input type="text" placeholder='Phone Number' required />}
                    <input type="password" placeholder='Password' />
                    {atLogin ? "" : <input type="password" placeholder='Confirm Password' />}
                    {atLogin ? <>
                        <div className='signUp_checkboxfogetpassword'>
                            <div className='checboxx'>
                                <input type="checkbox" />
                                <p>Remember Me</p>
                            </div>
                            <p className='forget_password'>Forgot Password?</p>
                        </div>
                    </> : ""}

                    <button type='submit' className='btn_signup'>{
                        atLogin ? ("Login") : "SignUp"}

                    </button>
                </form>
                <div className='login_text'>{atLogin ?
                    <>
                        <p>Not a member?</p>
                        <p className='login_link' onClick={() => setAtLogin(false)}> Register</p>

                    </> :
                    <>
                        <p>Already a member?</p>
                        <p className='login_link' onClick={() => setAtLogin(true)}>Login</p>
                    </>
                }
                </div>
            </div>

        </div>
    )
}

export default Signup;
