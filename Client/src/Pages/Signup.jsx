import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { register, login } from "../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import "./Signup.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaArrowRight,
  FaTree,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

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

  useEffect(() => {
    if (location.state?.showLogin) {
      setAtLogin(true);
    }
  }, [location.state]);

  const { isLoading } = useSelector((state) => state.user);

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
  };

  const switchToSignup = () => {
    resetFormData();
    setAtLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (atLogin) {
      const data = { email, password };
      const result = await dispatch(login(data));

      if (login.fulfilled.match(result)) {
        toast.success(result.payload.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } else {
      if (password !== confirmPasswod) {
        toast.error("Passwords do not match");
        return;
      }

      const data = { name, email, phone, password };
      const result = await dispatch(register(data));

      if (register.fulfilled.match(result)) {
        toast.success(result.payload.message);
        localStorage.setItem("email", result.payload.data.email);
        localStorage.setItem(
          "otpExpiration",
          result.payload.data.otpExpiration,
        );
        localStorage.setItem("canVerifyOtp", "true");
        navigate("/otp-verification");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup_ContainerS">
        <aside className="signup-aside">
          <div className="aside-brand">
            <img src={logo} alt="Family Tree Logo" className="aside-logo" />
            <span className="aside-brand-name">Family Tree</span>
          </div>

          <h2 className="aside-title">
            {atLogin
              ? "Welcome Back to Your Family Story"
              : "Start Preserving Your Family Legacy"}
          </h2>

          <p className="aside-text">
            {atLogin
              ? "Pick up right where you left off — your tree is waiting."
              : "Join thousands of families building, connecting, and preserving their history."}
          </p>

          <ul className="aside-features">
            <li>
              <span className="aside-feature-icon">
                <FaTree />
              </span>
              Build unlimited family trees
            </li>
            <li>
              <span className="aside-feature-icon">
                <FaShieldAlt />
              </span>
              Private &amp; encrypted
            </li>
            <li>
              <span className="aside-feature-icon">
                <FaUsers />
              </span>
              Invite family members
            </li>
          </ul>

          <div className="aside-footer">
            © {new Date().getFullYear()} Family Tree
          </div>
        </aside>

        <div className="signup_form">
          <div className="signup-header">
            <img className="head_Img" src={logo} alt="Family Tree Logo" />
            <h1>{atLogin ? "Welcome Back" : "Create Your Account"}</h1>
            <p className="signup-subtitle">
              {atLogin
                ? "Login to continue preserving your family's story."
                : "Sign up to build, organize, and share your family tree."}
            </p>
          </div>

          <form className="signUp_inputs" onSubmit={handleSubmit}>
            {!atLogin && (
              <div className="field-wrap">
                <FaUser className="field-icon" />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="field-wrap">
              <FaEnvelope className="field-icon" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {!atLogin && (
              <div className="field-wrap">
                <FaPhone className="field-icon" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            )}

            <div className="field-wrap">
              <FaLock className="field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                required
                autoComplete={atLogin ? "current-password" : "new-password"}
              />
              <span
                className="eye_icon"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

            {!atLogin && (
              <div className="field-wrap">
                <FaLock className="field-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPasswod}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <span
                  className="eye_icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  role="button"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
            )}

            {atLogin && (
              <div className="signUp_checkboxfogetpassword">
                <label className="checboxx">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <span className="forget_password">Forgot Password?</span>
              </div>
            )}

            <button type="submit" className="btn_signup" disabled={isLoading}>
              {isLoading ? (
                "Please Wait..."
              ) : (
                <>
                  {atLogin ? "Login" : "Sign Up"}
                  <FaArrowRight className="btn-arrow" />
                </>
              )}
            </button>
          </form>

          <div className="login_text">
            {atLogin ? (
              <>
                <p>Not a member?</p>
                <span className="login_link" onClick={switchToSignup}>
                  Register
                </span>
              </>
            ) : (
              <>
                <p>Already a member?</p>
                <span className="login_link" onClick={switchTologin}>
                  Login
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
