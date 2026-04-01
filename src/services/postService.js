export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_embed=likes`).then((res) => res.json())
}

export const getAllTopics = () => {
    return fetch(`http://localhost:8088/topics`).then((res) => res.json())
}