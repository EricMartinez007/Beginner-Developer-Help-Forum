import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { editUser, getUserById } from "../../services/userService"
import "./editProfile.css"

export const EditProfile = ({ currentUser }) => {
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const getAndSetUser = () => {
        getUserById(currentUser.id).then((user) => {
            setUser(user)
        })
    }

    useEffect(() => {
        getAndSetUser()
    }, [currentUser.id])

    const updateUser = (evt) => {
        const copy = { ...user } 
        copy[evt.target.id] = evt.target.id === "cohort" ? parseInt(evt.target.value) : evt.target.value
        setUser(copy)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        editUser(currentUser.id, user).then(() => {
            navigate(`/profile`)
        })
    }
    
    if(user === null) {
        return (
            <div>
                 Loading...   
            </div>
        )
    }

    return (
        <main className="container-edituser">
            <section>
                <h1>Edit User</h1>
                <span>Update your profile information below.</span>
                <form className="form-edituser" onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Full Name</h2>
                    <span>Enter your first and last name as you'd like it displayed.</span>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            value={user.name}
                            onChange={updateUser}
                            className="form-name"
                            placeholder={user.name}
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <h2>Email Address</h2>
                    <span>Enter your email address as you'd like it displayed.</span>
                    <div className="form-group">
                        <input
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={updateUser}
                            className="form-email"
                            placeholder={user.email}
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <h2>Cohort Number</h2>
                    <span>Must be a number.</span>
                    <div className="form-group">
                        <input
                            type="number"
                            id="cohort"
                            value={user.cohort}
                            onChange={updateUser}
                            className="form-cohort"
                            placeholder={user.cohort}
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group edituser-buttons">
                        <button className="submit-btn" type="submit">
                            Save Changes
                        </button>
                        <button 
                            className="cancel-btn" 
                            type="button"
                            onClick={() => navigate(`/profile`)}
                        >
                            Cancel
                        </button>
                    </div>
                </fieldset>
                </form>
            </section>
        </main>
    )
}