export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_embed=likes`).then((res) => res.json())
}

export const getAllTopics = () => {
    return fetch(`http://localhost:8088/topics`).then((res) => res.json())
}

export const getPostById = (currentPostId) => {
    return fetch(`http://localhost:8088/posts/${currentPostId}?_expand=topic&_expand=user&_embed=likes`).then((res) => res.json())
}

export const createLike = (newLike) => {
    return fetch("http://localhost:8088/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLike),
  }).then((res) => res.json())
}

export const getMyPosts = (currentUser) => {
    return fetch(`http://localhost:8088/posts?userId=${currentUser}`).then((res) => res.json())
}