import { Route, Routes } from "react-router-dom"
import { ApplicationView } from "./components/views/ApplicationView"
import { Register } from "./components/auth/Register"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="*" element={<ApplicationView/>} />
    </Routes>
  )
}
