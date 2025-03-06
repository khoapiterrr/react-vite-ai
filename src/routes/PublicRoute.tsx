import appConfig from '@/constants/appConfig'
import { useAuthStore } from '@/store'
import { Navigate, Outlet } from 'react-router-dom'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { isAuthenticated } = useAuthStore()

    return isAuthenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
