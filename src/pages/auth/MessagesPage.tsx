import React from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '../../redux/store'
import { Navigate } from 'react-router-dom'

const MessagesPage = () => {
    const isAuthenticated = useSelector((state: StoreType) => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return (<>
           <div>MessagesPage</div>
        </>)
    }
    return <Navigate to='/login' />

}

export default MessagesPage