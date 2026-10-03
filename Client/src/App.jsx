import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./features/user/userThunk";

import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import PersonForm from "./Pages/PersonForm";
import FamilyList from "./Components/FamilyList";
import FamilyTreeView from "./Components/FamilyTreeView";
import Signup from "./Pages/Signup";
import OtpVerification from "./Pages/OtpVerification";
import ProtectedOtpRoute from "./Components/ProtectedOtpRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/add-family", element: <PersonForm /> },
      { path: "/families", element: <FamilyList /> },
      { path: "/family/:id", element: <FamilyTreeView /> },
      { path: "/LoginSignup", element: <Signup /> },
      {
        path: "/otp-verification",
        element: (
          <ProtectedOtpRoute>
            <OtpVerification />
          </ProtectedOtpRoute>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const { authChecked } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
        Loading...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
