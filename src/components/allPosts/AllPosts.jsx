import { useEffect, useState } from "react"
import { getAllPosts, getAllTopics } from "../../services/postService"
import { Post } from "./Post"

export const AllPosts = ({ currentUser }) => {
    const [posts, setPosts] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [topicChoice, setTopicChoice] = useState(0)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray)
        })

        getAllTopics().then(topicsArray => {
            setTopics(topicsArray)
        })
    }, [])

    const filteredPosts = posts
        .filter(post => post.title.toLowerCase().includes(textSearch.toLowerCase()))
        .filter(post => topicChoice === 0 ? true : post.topicId === topicChoice)


    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            <article className="posts-filter-bar">
                <div className="filter-bar">
                    <input
                        onChange={(event) => {
                            setTextSearch(event.target.value)
                        }}
                        type="text"
                        placeholder="Search Posts"
                        className="post-search"
                    />
                </div>
                <div className="filter-bar">
                    <select
                        onChange={(event) => {
                            setTopicChoice(parseInt(event.target.value))
                        }}
                        id="topic-select"
                        value={topicChoice}
                        className="post-search"
                    >
                        <option key="0" value="0">All Topics</option>
                        {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
                    </select>
                </div>
            </article>
            <article className="posts-list">
                {filteredPosts.map((post) => {
                    return (
                        <Post
                            post={post}
                            key={post.id}
                        /> 
                    )
                })}
            </article>
        </div>
    )
}