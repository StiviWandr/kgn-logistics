/* eslint-disable */
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { CONFIG } from '../config/env'

export namespace API {
    export namespace CRM {
        export namespace AXIOS {
            export const privateApi: AxiosInstance = axios.create({
                baseURL: CONFIG.APP_API_URL,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
            })

            privateApi.interceptors.request.use(
                config => {
                    const token = localStorage.getItem('access_token')
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                    return config
                },
                error => Promise.reject(error)
            )

            export interface IRefreshResponse {
                access_token: string
            }

            privateApi.interceptors.response.use(
                response => response,
                async error => {
                    const originalRequest = error.config
                    if (error.response.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true

                        try {
                            const refreshToken = localStorage.getItem('refresh_token')
                            const {
                                data: { access_token },
                            }: AxiosResponse<IRefreshResponse> = await publicApi.post('/auth/refresh', { refreshToken })

                            localStorage.setItem('access_token', access_token)

                            originalRequest.headers.Authorization = `Bearer ${access_token}`
                            return axios(originalRequest)
                        } catch (error) {
                            // Handle refresh token error or redirect to login
                        }
                    }

                    return Promise.reject(error)
                }
            )

            export const publicApi: AxiosInstance = axios.create({
                baseURL: CONFIG.APP_API_URL,
            })
        }
        export const PROTECTED = AXIOS.privateApi
        export const PUBLIC = AXIOS.publicApi
    }
}
