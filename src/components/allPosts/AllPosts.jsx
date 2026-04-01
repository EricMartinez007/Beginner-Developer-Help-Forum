import { useEffect, useState } from "react"
import { getAllPosts, getAllTopics } from "../../services/postService"
import { Post } from "./Post"
import "./Posts.css"

export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [textSearch, setTextSearch] = useState("")
    const [topicChoice, setTopicChoice] = useState(0)
    const [topics, setTopics] = useState([])

    //getting all posts and topics from fetches on the initial render of the page
    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray)
        })

        getAllTopics().then(topicsArray => {
            setTopics(topicsArray)
        })
    }, [])

    const filteredPosts = posts
        // Added .toLowerCase to both post.title and textSearch so it would'nt matter if the letters were capitalized or not 
        .filter(post => post.title.toLowerCase().includes(textSearch.toLowerCase()))
        // If topicChoice is 0 (no choice selected) then return all posts. If a topic is selected then we filter the posts based on if the post.topicId matches the topicChoice we selected
        .filter(post => topicChoice === 0 ? true : post.topicId === topicChoice)


    return (
        <div className="posts-container">
            <h2>All Posts</h2>
            <span>Browse and discover posts from the community</span>
            <article className="posts-filter-bar">
                <div className="filter-bar">
                    <input
                        //the on change here is what is setting our textSearch string
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
                        //the on change here is what is setting our topicChoice number. We need to use parseInt to change the string into a number for the filter comparison above 
                        onChange={(event) => {
                            setTopicChoice(parseInt(event.target.value))
                        }}
                        id="topic-select"
                        value={topicChoice}
                        className="post-search"
                    >
                        <option key="0" value="0">All Topics</option>
                        {topics.map(topic => 
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        )}
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