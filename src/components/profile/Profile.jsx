import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById } from "../../services/userService"
import { getMyPosts } from "../../services/postService"
import "./profile.css"

export const Profile = ({ currentUser }) => {
    const [user, setUser] = useState(null)
    const [myPosts, setMyPosts] = useState([])

    const navigate = useNavigate()

    const getAndSetUserAndUserPosts = () =>{
        getUserById(currentUser.id).then((userObj) => {
            setUser(userObj)
        })
        getMyPosts(currentUser).then((posts) => {
            setMyPosts(posts)
        })
    }

    useEffect(() => {
        if(currentUser.id){
            getAndSetUserAndUserPosts()
        }
    }, [currentUser.id])

    const totalLikesReceived = myPosts.reduce((total, post) => {
        return total + post.likes.length
    }, 0)
    
    if (user === null) {
        return (
            <div>
                Loading...   
            </div>
        )
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Profile</h1>
            <section className="profile-section">
                <h2 className="profile-name">{user.name}</h2>
                <div className="profile-info">
                    <span className="profile-email">📧Email: {user.email}</span>
                    <span className="profile-cohort">🎓 Cohort: {user.cohort}</span>
                    <span className="profile-posts">📝 Posts: {myPosts.length}</span>
                    <span className="profile-likes">❤️ Likes Received: {totalLikesReceived}</span>
                </div>
                <div className="profile-buttons">
                    <button 
                        className="edit-btn"
                        type="button"
                        onClick={() => navigate(`/profile/edit`)}
                    >
                        Edit Profile
                    </button> 
                </div>
            </section>
        </div>
    )
}