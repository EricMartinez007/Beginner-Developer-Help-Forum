import { useNavigate } from "react-router-dom"

export const Post = ({ post }) => {
    const navigate = useNavigate()
    return (
        <section 
            className="post"
            onClick={() => navigate(`/post/${post.id}`)}
        >
            <span className="post-topic">{post.topic.name}</span>
            <div className="post-footer">
                <span className="post-title">{post.title}</span>
                <span className="post-likes">❤️{post.likes.length}</span>
            </div>
        </section>
    )
}