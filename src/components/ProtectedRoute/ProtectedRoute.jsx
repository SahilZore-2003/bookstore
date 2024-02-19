import React from 'react'
import { useFirebase } from "../../context/AuthContext"
const ProtectedRoute = ({ children }) => {
    const { user } = useFirebase()
    if (user?.email !== "admin@gmail.com") {
        return
    } else {
        return children;
    }

}

export default ProtectedRoute
