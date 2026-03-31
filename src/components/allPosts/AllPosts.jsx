import { getAllPosts } from "../../services/postService"

export const AllPosts = () => {
    return (
        <div className="post-container">
            <h2>All Posts</h2>
            <article className="posts">
                {/* put post function here */}
            </article>
        </div>
    )
}