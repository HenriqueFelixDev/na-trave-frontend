import axios from 'axios'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
    HunchesScreen,
    LoginScreen,
    OnBoardingScreen,
    LeaderboardScreen,
    SignUpScreen,
} from '~/screens'
import { AuthContext } from '~/providers/AuthProvider'
import authService from '~/domain/services/auth.service'
import { AuthRoute, ProtectedRoute } from '~/components'

export function App() {
    const [user, setUser] = useContext(AuthContext)

    axios.interceptors.response.use(
        null,
        (error) => {
            if (error?.response?.status === 401) {
                authService.signOut()
                setUser(null)
            }

            throw error
        }
    )

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<OnBoardingScreen />} />
                <Route path="/auth" element={<AuthRoute redirectTo="/dashboard" />}>
                    <Route path="signin" element={<LoginScreen />} />
                    <Route path="signup" element={<SignUpScreen />} />
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute redirectTo="/auth/signin" />}>
                    <Route path="" element={<HunchesScreen />} />
                    <Route path="leaderboard" element={<LeaderboardScreen />} />
                </Route>
                <Route path="/u/:username" element={<HunchesScreen />} />
            </Routes>
        </BrowserRouter>
    )
}
