import { lazy } from 'react'
import type { Route } from '@/types/routes'
const authRoute: Route[] = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@pages/auth/Login')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@pages/auth/Login')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@pages/auth/Login')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@pages/auth/Login')),
        authority: [],
    },
]

export default authRoute
