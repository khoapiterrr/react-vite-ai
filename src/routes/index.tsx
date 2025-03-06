import { lazy } from 'react';
import type { Routes } from '@/types/routes';

// Lazy load components
const Login = lazy(() => import('@pages/auth/Login'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const Profile = lazy(() => import('@pages/profile'));
const NotFound = lazy(() => import('@pages/error/NotFound'));
const Forbidden = lazy(() => import('@pages/error/Forbidden'));

// Public routes
export const publicRoutes: Routes = [
  {
    key: 'login',
    path: '/login',
    component: Login,
    authority: [],
    meta: {
      pageContainerType: 'contained',
      header: {
        title: 'Login',
      },
    },
  },
//   {
//     key: 'register',
//     path: '/register',
//     component: Register,
//     authority: [],
//     meta: {
//       pageContainerType: 'contained',
//       header: {
//         title: 'Register',
//       },
//     },
//   },
//   {
//     key: 'forgot-password',
//     path: '/forgot-password',
//     component: ForgotPassword,
//     authority: [],
//     meta: {
//       pageContainerType: 'contained',
//       header: {
//         title: 'Forgot Password',
//       },
//     },
//   },
];

// Private routes
export const privateRoutes: Routes = [
  {
    key: 'dashboard',
    path: '/',
    component: Dashboard,
    authority: ['admin', 'user'],
    meta: {
      pageContainerType: 'default',
      header: {
        title: 'Dashboard',
      },
    },
  },
  {
    key: 'profile',
    path: '/profile',
    component: Profile,
    authority: ['admin', 'user'],
    meta: {
      pageContainerType: 'default',
      header: {
        title: 'Profile',
      },
    },
  },
];

// Error routes
export const errorRoutes: Routes = [
  {
    key: '404',
    path: '/404',
    component: NotFound,
    authority: [],
    meta: {
      pageContainerType: 'contained',
      header: {
        title: '404 - Page Not Found',
      },
    },
  },
  {
    key: '403',
    path: '/403',
    component: Forbidden,
    authority: [],
    meta: {
      pageContainerType: 'contained',
      header: {
        title: '403 - Forbidden',
      },
    },
  },
];

// Combine all routes
export const routes: Routes = [
  ...publicRoutes,
  ...privateRoutes,
  ...errorRoutes,
  // Catch all route - redirect to 404
  {
    key: 'catch-all',
    path: '*',
    component: NotFound,
    authority: [],
    meta: {
      pageContainerType: 'contained',
      header: {
        title: '404 - Page Not Found',
      },
    },
  },
]; 