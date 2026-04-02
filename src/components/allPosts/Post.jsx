import { useNavigate } from "react-router-dom"

export const Post = ({ post }) => {
    const navigate = useNavigate()
    //Here we have an onClick event to take the user to the Post Details page once the click on the post they want to see
    return (
        <section 
            className="post"
            onClick={() => navigate(`/post/${post.id}`)}
        >
            <span className="post-topic">{post.topic.name}</span>
            <div className="post-footer">
                <div className="post-left">
                    <span className="post-title">{post.title}</span>
                <span className="post-author">Author: {post.user.name}</span>
                </div>
                <span className="post-likes">❤️{post.likes.length}</span>
            </div>
        </section>
    )
}