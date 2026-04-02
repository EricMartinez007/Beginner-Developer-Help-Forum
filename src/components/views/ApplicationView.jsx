import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { AllPosts } from "../allPosts/AllPosts"
import { MyPosts } from "../myPosts/MyPosts"
import { NewPost } from "../newPost/NewPost"
import { PostDetails } from "../postDetails/PostDetails"
import { Favorites } from "../favorites/Favorites"
import { Profile } from "../profile/Profile"
import { EditProfile } from "../editProfile/EditProfile"
import { EditPosts } from "../editPost/EditPost"

export const ApplicationView = () => {
    const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
    const localOharaUser = localStorage.getItem("ohara_user")
    const oharaUserObject = JSON.parse(localOharaUser)

    setCurrentUser(oharaUserObject)
}, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<AllPosts />} />
                <Route path="myposts" element={<MyPosts currentUser={currentUser} />} />
                <Route path="newpost" element={<NewPost currentUser={currentUser} />} />
                <Route path="post/:postId" element={<PostDetails currentUser={currentUser} />} />
                <Route path="post/:postId/edit" element={<EditPosts />} />
                <Route path="favorites" element={<Favorites currentUser={currentUser} />} />
                <Route path="profile" element={<Profile currentUser={currentUser} />} />
                <Route path="profile/edit" element={<EditProfile currentUser={currentUser} />} />
            </Route>
        </Routes>
    )
}