import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
        if (foundUsers.length === 1) {
            const user = foundUsers[0]
            localStorage.setItem(
                "ohara_user",
                JSON.stringify({
                    id: user.id,
                })
            )

            navigate("/")
        } else {
            window.alert("Invalid login")
        }
        })
    }

    return (
        <main className="container-login">
        <section>
            <h1>Welcome To The Library of Ohara</h1>
            <form className="form-login" onSubmit={handleLogin}>
            <h2>Please sign in</h2>
            <fieldset>
                <div className="form-group">
                <input
                    type="email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <button className="login-btn btn-info" type="submit">
                    Sign in
                </button>
                </div>
            </fieldset>
            </form>
        </section>
        <section>
            <Link to="/register" className="register-link">Not a member yet?</Link>
        </section>
        </main>
    )
    
}