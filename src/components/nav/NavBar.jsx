import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">All Posts</Link>
                </li>
                <li>
                    <Link to="myposts">My Posts</Link>
                </li>
                <li>
                    <Link to="favorites">Favorites</Link>
                </li>
                <li>
                    <Link to="newpost">New Post</Link>
                </li>
                <li>
                    <Link to="profile">Profile</Link>
                </li>
                {localStorage.getItem("ohara_user") ? (
                    <li className="navbar-item navbar-logout">
                        <Link
                            className="navbar-link"
                            to=""
                            onClick={() => {
                                localStorage.removeItem("ohara_user")
                                navigate("/login", { replace: true })
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                ) : (
                ""
                )}
            </ul>
        </nav>
    )
}