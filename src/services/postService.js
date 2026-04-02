export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_expand=user&_embed=likes`).then((res) => res.json())
}

export const getAllTopics = () => {
    return fetch(`http://localhost:8088/topics`).then((res) => res.json())
}

export const getPostById = (currentPostId) => {
    return fetch(`http://localhost:8088/posts/${currentPostId}?_expand=topic&_expand=user&_embed=likes`).then((res) => res.json())
}

export const createPost = (newPost) => {
    return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => res.json())
}

export const getMyPosts = (currentUser) => {
    return fetch(`http://localhost:8088/posts?userId=${currentUser.id}&_expand=topic&_embed=likes`).then((res) => res.json())
}

export const deleteMyPost = (selectedPostId) => {
    return fetch (`http://localhost:8088/posts/${selectedPostId}`, {
        method: "DELETE"
    })
}

export const editMyPost = (postId, updatedPost) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  }).then((res) => res.json())
}