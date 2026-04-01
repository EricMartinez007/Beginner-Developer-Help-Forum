export const Post = ({ post }) => {
    return (
        <section className="post">
            <header className="post-info">{post.topic.name}</header>
            <div>{post.title}</div>
            <div>{post.likes.length}</div>
        </section>
    )
}