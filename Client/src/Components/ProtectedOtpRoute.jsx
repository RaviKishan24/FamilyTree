import {Navigate} from "react-router-dom";
import {useSelector} from 'react-redux';


function ProtectedOtpRoute({children}) {
 const canVerifyOTP=useSelector((state)=>state.user.canVerifyOTP) || localStorage.getItem("canVerifyOtp")==="true";
 if(!canVerifyOTP){
    return <Navigate to={"/LoginSignup"}/>
 }

 return children;
}

export default ProtectedOtpRoute;
