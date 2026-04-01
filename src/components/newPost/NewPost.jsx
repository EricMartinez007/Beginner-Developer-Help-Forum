import { useEffect, useState } from "react"
import { createPost, getAllTopics } from "../../services/postService"
import { useNavigate } from "react-router-dom"
import "./newPost.css"

export const NewPost = ({ currentUser }) => {
    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
        topicId: 0,
        userId: currentUser.id,
        date: new Date(),
    })
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getAllTopics().then(topicsArray => {
            setTopics(topicsArray)
        })
    }, [])

    const updateNewPost = (evt) => {
        const copy = { ...newPost }
        copy[evt.target.id] = evt.target.id === "topicId" ? parseInt(evt.target.value) : evt.target.value
        setNewPost(copy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createPost(newPost).then(() => {
            navigate("/myposts")
        })
    }

    return (
        <main className="container-newpost">
            <section>
                <h1>Create a New Post</h1>
                <span>Share your thoughts, questions, or insights with the community.</span>
                <form className="form-newpost" onSubmit={handleSubmit}>
                <h2>Title</h2>
                <fieldset>
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            value={newPost.title}
                            onChange={updateNewPost}
                            className="form-title"
                            placeholder="Enter a descriptive title for your post"
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
                            value={newPost.body}
                            onChange={updateNewPost}
                            className="form-body"
                            placeholder="Write your post content here. You can share ideas, ask questions, or start a discussion..."
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
                                    onChange={updateNewPost}
                                />
                                <span>{topic.name}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group newpost-buttons">
                        <button className="submit-btn" type="submit">
                            Publish Post
                        </button>
                        <button 
                            className="cancel-btn" 
                            type="button"
                            onClick={() => navigate(`/`)}
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