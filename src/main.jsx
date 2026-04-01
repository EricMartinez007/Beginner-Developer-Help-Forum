import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

//BrowserRouter must wrap the entire app to enable React Router's routing functionality
const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>)
