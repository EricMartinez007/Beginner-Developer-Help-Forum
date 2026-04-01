import { useNavigate } from "react-router-dom"

export const PostDetailsButton = ({ currentUser, post, handleNewLike }) => {
    const navigate = useNavigate()

    // DO NOT ADD () TO handleNewLike IN THE onClick IT CAUSES AN INFINITE LOOP AS SOON AS THE PAGE RENDERS
    return (
        <div>
            {currentUser.id === post.userId ? (
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/post/${post.id}/edit`)}
                >
                    Edit Post
                </button>
            ) : (
                <button 
                    className="btn btn-primary"
                    onClick={handleNewLike}
                >
                    Like & Add to Favorites
                </button>
            )}
        </div>
    )
}