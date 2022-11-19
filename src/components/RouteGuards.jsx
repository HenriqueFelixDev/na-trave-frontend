import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

export function ProtectedRoute({redirectTo}) {
    const [user] = useContext(AuthContext)

    return user ? <Outlet /> : <Navigate to={redirectTo} />
}

export function AuthRoute({redirectTo}) {
    const [user] = useContext(AuthContext)

    return user ? <Navigate to={redirectTo} /> : <Outlet />
}