import { Link } from "react-router-dom"

export const NavBar = () => {

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
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem("ohara_user")
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