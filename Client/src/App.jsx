import Footer from "./Footer"
import Home from "./Home"
import Navbar from "./Navbar"
import { Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import AddFamily from "./AddFamily"

function App() {




  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginSignup" element={<Signup />} />
        <Route path="/add-family" element={<AddFamily></AddFamily>}/>
        

      </Routes>



      <Footer />

    </>
  )
}

export default App
