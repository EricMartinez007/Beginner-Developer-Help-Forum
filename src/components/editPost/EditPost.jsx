import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editMyPost, getAllTopics, getPostById } from "../../services/postService"
import "./editPost.css"

export const EditPosts = ({ currentUser }) => {
    const [post, setPost] = useState(null)
    const [topics, setTopics] = useState([])

    const navigate = useNavigate()

    const { postId } = useParams()

    const getAndSetPostById = () => {
        getPostById(postId).then((post) => {
            setPost(post)
        })
    }

    useEffect(() => {
        getAndSetPostById()
    }, [])

    useEffect(() => {
        getAllTopics().then(topics => {
            setTopics(topics)
        })
    }, [])

    const updatePost = (evt) => {
        const copy = { ...post } 
        copy[evt.target.id] = evt.target.id === "topicId" ? parseInt(evt.target.value) : evt.target.value
        setPost(copy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editMyPost(postId, post).then(() => {
            navigate(`/post/${post.id}`)
        })
    }

    if(post === null) {
        return (
            <div>
                Loading...   
            </div>
        )
    }
    
    return (
        <main className="container-editpost">
            <section>
                <h1>Edit Post</h1>
                <span>You are modifying an existing post. Changes will replace the current version.</span>
                <form className="form-editpost" onSubmit={handleSubmit}>
                <h2>Title</h2>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            value={post.title}
                            onChange={updatePost}
                            className="form-title"
                            placeholder={post.title}
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <h2>Body</h2>
                <fieldset>
                    <div className="form-group">
                        <textarea
                            type="text"
                            id="body"
                            value={post.body}
                            onChange={updatePost}
                            className="form-body"
                            placeholder={post.body}
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <h2>Select a Topic</h2>
                <fieldset>
                    <div className="form-group">
                        {topics.map(topic => (
                            <label key={topic.id}>
                                <input
                                    type="radio"
                                    name="topicId"
                                    id="topicId"
                                    value={topic.id}
                                    onChange={updatePost}
                                    checked={topic.id === post.topicId}
                                />
                                <span>{topic.name}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group editpost-buttons">
                        <button className="submit-btn" type="submit">
                            Save Changes
                        </button>
                        <button 
                            className="cancel-btn" 
                            type="button"
                            onClick={() => navigate(`/post/${post.id}`)}
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