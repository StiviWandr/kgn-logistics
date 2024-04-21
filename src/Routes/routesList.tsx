import { SignUp } from '../Modules/Auth/SignUp/SignUp'
import { SignInPage, UsersPage } from '../Pages'
import { HomePage } from '../Pages/HomePage/HomePage'

interface RouteType {
    path: string
    element: React.ReactNode
    title?: string

    protected?: boolean
    canUseRouteIf?: string
    ifNotAllowedPath?: string
}

const layoutRoutes: RouteType[] = [
    {
        path: '/users',
        protected: true,
        canUseRouteIf: '!!access',
        ifNotAllowedPath: '/',
        element: <UsersPage />,
        title: 'Пользователи',
    },
    {
        path: '/',
        protected: true,
        canUseRouteIf: '!!access',
        ifNotAllowedPath: '/signin',
        element: <HomePage />,
        title: 'Главная',
    },
]
const noLayoutRoutes: RouteType[] = [
    {
        path: '/signin',
        protected: true,
        canUseRouteIf: '!access',
        ifNotAllowedPath: '/',
        element: <SignInPage />,
        title: 'Вход',
    },
    {
        path: '/signup',
        protected: true,
        canUseRouteIf: '!access',
        ifNotAllowedPath: '/',
        element: <SignUp />,
        title: 'Вход',
    },
]

export { noLayoutRoutes, layoutRoutes }
