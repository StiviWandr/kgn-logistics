import { SignUp } from '../Modules/Auth/SignUp/SignUp'
import { SignInPage, UsersPage } from '../Pages'

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
        canUseRouteIf: 'true',
        ifNotAllowedPath: '/',
        element: <UsersPage/>,
        title: 'Пользователи',
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
        element: <SignUp/>,
        title: 'Вход',
    },
    
    {
        path: '/',
        protected: true,
        canUseRouteIf: '!!access',
        ifNotAllowedPath: '/',
        element: <SignInPage />,
        title: 'Вход',
    }
   
]

export { noLayoutRoutes, layoutRoutes }
