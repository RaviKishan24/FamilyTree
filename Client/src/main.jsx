import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AddFamily from './AddFamily.jsx'
import PersonForm from './PersonForm.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
<App/>
    </BrowserRouter >

)
