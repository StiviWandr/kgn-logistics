import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '../../Modules/Auth/redux/auth.slice'
import { loadFromLocalStorage, localStorageMiddleware } from './middleWares'


export const globalInitialStates = {
    [authSlice.name]: authSlice.getInitialState(),
}
export const appReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
   
})

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadFromLocalStorage(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type RootKeys = keyof RootState
export type AppDispatch = typeof store.dispatch
