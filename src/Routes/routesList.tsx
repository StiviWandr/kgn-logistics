import { SignUp } from '../Modules/Auth/SignUp/SignUp'
import { SignInPage } from '../Pages'

interface RouteType {
    path: string
    element: React.ReactNode
    title?: string
    
    protected?: boolean
    canUseRouteIf?: string
    ifNotAllowedPath?: string
}


const otherRoutes: RouteType[] = [
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

export { otherRoutes }
