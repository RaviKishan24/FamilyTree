import Footer from "./Footer"
import Home from "./Home"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"
import Signup from "./Signup"

function App() {




  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginSignup" element={<Signup />} />
        

      </Routes>



      <Footer />

    </>
  )
}

export default App
