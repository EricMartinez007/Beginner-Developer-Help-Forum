import { useEffect, useState } from "react"
import { deleteMyPost, getMyPosts } from "../../services/postService"
import { useNavigate } from "react-router-dom"
import "./myPosts.css"

export const MyPosts = ({ currentUser }) => {
    const [myPosts, setMyPosts] = useState([])

    const navigate = useNavigate()
    
    const getAndSetMyPosts = () => {
        getMyPosts(currentUser).then(postsArray => {
            setMyPosts(postsArray)
        })
    }

    //Need to add a check here so it only fetches when currentUser.id actually exists. If not then when you try to reload the page nothing will appear
    useEffect(() => {
        if(currentUser.id) {
            getMyPosts(currentUser).then(postsArray => {
                setMyPosts(postsArray)
        })
        }
    }, [currentUser])

    const handlePostDelete = (postId) => {
        deleteMyPost(postId).then(() => {
            getAndSetMyPosts()
        })
    }

    return (
        <div className="myposts-container">
            <h2>My Posts</h2>
            <span>Manage and review all posts you've written</span>
            <article className="myposts-list">
                {myPosts.map((post) => {
                    return (
                        <section className="mypost" key={post.id} >
                            <span className="mypost-topic">{post.topic.name}</span>
                            <div className="mypost-middle">
                                <h3 
                                    className="mypost-title"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    {post.title}
                                </h3>
                                <button 
                                    className="delete-btn" 
                                    type="button"
                                    onClick={() => handlePostDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <span className="mypost-likes">❤️{post.likes.length}</span>
                        </section>
                    )
                })}
            </article>
        </div>
    )
}