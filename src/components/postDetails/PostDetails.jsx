import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import "./postDetails.css"
import { PostDetailsButton } from "./PostDetailsButtons"
import { createLike } from "../../services/likeService"

export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState(null)

    //the name here has to match the URL parameter that was defined in ApplicationView.jsx
    const { postId } = useParams()

    const getAndSetPost = () => {
        getPostById(postId).then(postObj => {
            setPost(postObj)
        })
    } 

    useEffect(() => {
        getPostById(postId).then(postObj => {
            setPost(postObj)
        })
    }, [postId])

    const handleNewLike = () => {
        const newLike = {
            userId: currentUser.id,
            postId: parseInt(postId)
        }

        createLike(newLike).then(() => {
            getAndSetPost()
        })
    }
    
    //Loading state guard since we set post as null on initial render. This helps us not have to use the chaining operator ?  
    if (post === null) {
        return (
            <div>
                Loading...   
            </div>
        )
    }
    
    return (
        <div className="page-container">
            <section className="post-section">
                <span className="post-topic">{post.topic.name}</span>
                <div className="post-info">
                    <h1 className="post-title">{post.title}</h1>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-date">{post.date}</span>
                    <span className="post-likes">❤️{post.likes.length}</span>
                </div>
                <div className="post-details">
                    <article className="post-body">{post.body}</article>
                </div>
                <footer className="post-buttons">
                    <PostDetailsButton currentUser={currentUser} post={post} handleNewLike={handleNewLike} />
                </footer>
            </section>    
        </div>
    )
}