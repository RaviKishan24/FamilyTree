import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import PersonForm from "./Pages/PersonForm";
import Signup from "./Pages/Signup"
import OtpVerification from "./Pages/OtpVerification";
import ProtectedOtpRoute from "./Components/ProtectedOtpRoute";


function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "/add-family", element: <PersonForm /> },
        { path: "/LoginSignup", element: <Signup /> },
        { path: "/otp-verification", element: (<ProtectedOtpRoute><OtpVerification /></ProtectedOtpRoute>) }
      ]
    }
  ]);
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  )
}

export default App
