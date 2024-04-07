import { Route, Routes as Routers} from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '../utils/hooks/redux'
import { useEffect, useState } from 'react'
import { hasAccess } from '../Modules/Auth/redux/auth.slice'
import { otherRoutes } from './routesList'
import { Spin } from 'antd'

export function Routes() {
    const [isLoaded, setIsLoaded] = useState(false)
    const { access } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function fetchData() {
            setIsLoaded(false)
            await dispatch(hasAccess())
            setIsLoaded(true)
        }
        fetchData()
    }, [dispatch])
    if (!isLoaded) return <Spin fullscreen />
    return (
        <>
            <Routers>
                {otherRoutes.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.protected && route.canUseRouteIf ? (
                                <ProtectedRoute
                                    canUseRouteIf={eval(route.canUseRouteIf)}
                                    ifNotAllowedPath={route.ifNotAllowedPath || '/'}
                                >
                                    {route.element}
                                </ProtectedRoute>
                            ) : (
                                route.element
                            )
                        }
                    />
                ))}
            </Routers>
        </>
    )
}
