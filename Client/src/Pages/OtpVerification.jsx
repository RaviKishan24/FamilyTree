import React, { useEffect, useState } from "react";
import "./OtpVerification.css";
import { useDispatch, useSelector } from "react-redux"
import { otpVerification } from "../features/user/userThunk"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OtpVerification() {

  const otpExpiration = useSelector((state) => state.user.otpExpiration) || localStorage.getItem("otpExpiration")
  const isLoading = useSelector((state) => state.user.isLoading)
  const error = useSelector((state) => state.user.error);

  const userEmail = localStorage.getItem("email") || useSelector((state) => state.user.email);

  const calculateTimeLeft = () => {
    if (!otpExpiration) return 0;
    const expiry = new Date(otpExpiration).getTime();
    const now = Date.now();
    return Math.max(Math.floor((expiry - now) / 1000), 0);
  }


  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
  };



  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const verifyOtp = async () => {

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }
    const data = { email: userEmail, otp: enteredOtp };
    const Result = await dispatch(otpVerification(data))
    console.log("result from otp verification ", Result);

    if (otpVerification.fulfilled.match(Result)) {
      localStorage.removeItem("email");
      localStorage.removeItem("otpExpiration");
      localStorage.removeItem("canVerifyOtp");
      toast.success(Result.payload.message + " Please Login")
      navigate("/LoginSignup", {
        state: {
          showLogin: true,
        }
      });

    } else {
      toast.error(Result.payload);
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    }


  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [otpExpiration]);

  useEffect(() => {
    document.getElementById("otp-0")?.focus();
  }, []);




  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2>OTP Verification</h2>

        <p className="otp-message">
          We've sent a verification code to
        </p>

        <p className="email">{userEmail}</p>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="otp-input"
            />
          ))}
        </div>

        <div className="timer">
          Time Remaining: {formatTime()}
        </div>

        {timeLeft === 0 ? (
          <button
            className="resend-btn"
          >
            Resend OTP
          </button>
        ) : (
          <p className="resend-text">
            Resend available after timer ends
          </p>
        )}
        <button
          className="verify-btn"
          onClick={verifyOtp}
          disabled={otp.join("").length !== 6 || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;