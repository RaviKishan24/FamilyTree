import { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import TextField from '@mui/material/TextField';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register, login } from "../features/user/userThunk"
import { useDispatch, useSelector } from "react-redux"
import "./Signup.css"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [atLogin, setAtLogin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPasswod, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(()=>{
        if(location.state?.showLogin){
            setAtLogin(true)
        }
    },[location.state])


    const { isLoading, error } = useSelector((state) => state.user);

    const resetFormData = () => {
        setName("");
        setEmail("");
        setPhone("");
        SetPassword("");
        setConfirmPassword("");
    };

    const switchTologin = () => {
        resetFormData();
        setAtLogin(true);
    }

    const switchToSignup = () => {
        resetFormData();
        setAtLogin(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (atLogin) {

            const data = {
                email,
                password
            };

            console.log("Login Data:", data);

           const result= await  dispatch(login(data));
           if(login.fulfilled.match(result)){
            toast.success(result.payload.message)
            navigate("/")
           }else{
            toast.error(result.message)
           }

        } else {

            if (password !== confirmPasswod) {
                toast.error("Passwords do not match");
                return;
            }

            const data = {
                name,
                email,
                phone,
                password
            };
            console.log("Signup Data:", data);
            const result = await dispatch(register(data));

            if (register.fulfilled.match(result)) {
                toast.success(result.payload.message)
                localStorage.setItem("email", result.payload.data.email);
                localStorage.setItem("otpExpiration", result.payload.data.otpExpiration);
                localStorage.setItem("canVerifyOtp", "true");
                navigate("/otp-verification");
            }
            ;
        }
    };


    return (

        <div className='signup_ContainerS'>

            <div className='signup_form'>
                <img className='head_Img' src={logo} alt="Logo" />
                <h1>  Preserving Family Stories for Generations</h1>
                <p>{atLogin ? ("Login to explore Our platform that helps you create, organize, and share your family tree in a secure and beautiful way") : ("Signup to explore Our platform that helps you create, organize, and share your family tree in a secure and beautiful way")}</p>

                <form className='signUp_inputs' onSubmit={handleSubmit}>
                    {atLogin ? "" : <input type="text" placeholder='Your Full Name' required value={name} onChange={(e) => setName(e.target.value)} />}
                    <input type="email" placeholder='Email Address' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    {atLogin ? "" : <input type="text" placeholder='Phone Number' required value={phone} onChange={(e) => setPhone(e.target.value)} />}
                    <div className="password_container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                        />

                        <span
                            className="eye_icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </span>
                    </div>
                    {!atLogin && (
                        <div className="password_container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPasswod}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <span
                                className="eye_icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </div>
                    )}
                    {atLogin ? <>
                        <div className='signUp_checkboxfogetpassword'>
                            <div className='checboxx'>
                                <input type="checkbox" />
                                <p>Remember Me</p>
                            </div>
                            <p className='forget_password'>Forgot Password?</p>
                        </div>
                    </> : ""}

                    <button type="submit" className="btn_signup" disabled={isLoading} >
                        {isLoading ? "Please Wait..." : atLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className='login_text'>{atLogin ?
                    <>
                        <p>Not a member?</p>
                        <p className='login_link' onClick={switchToSignup} > Register</p>

                    </> :
                    <>
                        <p>Already a member?</p>
                        <p className='login_link' onClick={switchTologin}>Login</p>
                    </>
                }
                </div>
            </div>

        </div>
    )
}

export default Signup;
