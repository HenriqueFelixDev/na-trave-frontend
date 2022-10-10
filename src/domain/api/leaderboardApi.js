import axios from 'axios'

import { getAxiosConfig } from './axiosConfig'


export async function getLeaderboard() {
    try {
        const result = await axios({
            ...getAxiosConfig(),
            url: '/leaderboard.json'
        })
        return result.data
    } catch (e) {
        if (e.response.status === 404) {
            return []
        }

        throw e
    }
}