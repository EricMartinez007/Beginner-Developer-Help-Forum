import { useEffect, useState } from "react"

export const ApplicationView = () => {
    const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
    const localOnePieceUser = localStorage.getItem("one_piece_user")
    const onePieceUserObject = JSON.parse(localOnePieceUser)

    setCurrentUser(onePieceUserObject)
}, [])

    return (
        <div>
            <h1>Welcome to User view</h1>
        </div>
    )
}