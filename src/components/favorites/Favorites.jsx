import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteLike, getFavoritePosts } from "../../services/likeService"
import "./favorites.css"

export const Favorites = ({ currentUser }) => {
    const [favorites, setFavorites] = useState([])

    const navigate = useNavigate()

    const getAndSetMyFavs = () => {
        getFavoritePosts(currentUser).then(favoritesArray => {
            setFavorites(favoritesArray)
        })
    }

    useEffect(() => {
        if(currentUser.id){
            getFavoritePosts(currentUser).then(favoritesArray => {
                setFavorites(favoritesArray)
        })
        }
    }, [currentUser])
 
    const handleRemoveFavorite = (likeId) => {
        deleteLike(likeId).then(() => {
            getAndSetMyFavs()
        })
    }
    
    //FOR onClick IN REMOVE BUTTON: Because the deleteLike function needs the likeId and not the postId we need to use .find to look through the post's likes and find the one that belongs to the currentUser, then delete that like based on the like.userId and currentUser.id matching
    return (
        <div className="myfavs-container">
            <h2>My Favorites</h2>
            <span className="page-subtitle">Your collection of liked posts</span>
            <article className="myfavs-list">
                {favorites.map((favPost) => {
                    return (
                        <section className="myfavs" key={favPost.id} >
                            <span className="myfavs-topic">{favPost.topic.name}</span>
                            <div className="myfavs-middle">
                                <h3 
                                    className="myfavs-title"
                                    onClick={() => navigate(`/post/${favPost.id}`)}
                                >
                                    {favPost.title}
                                </h3>
                                <button 
                                    className="remove-btn" 
                                    type="button"
                                    onClick={() => {
                                        const likeToDelete = favPost.likes.find(like => like.userId === currentUser.id)
                                        handleRemoveFavorite(likeToDelete.id) 
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                            <span className="myfavs-likes">❤️{favPost.likes.length}</span>
                        </section>
                    )
                })}
            </article>
        </div>
    )
}