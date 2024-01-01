import { ref } from "vue";
import { supabaseClient } from "../supabaseClient";

export type StreakDay = {
    id: string
    streak_id: number
    created_at: string
}

export type Streak = {
    id: string
    name: string
    user_id: string
    created_at: string
    streak_days: StreakDay[]
}

export const useStreak = () => {
    const streak = ref<Streak | null>(null)
    const user_id = "7db5c012-1491-40bd-92a8-7eebde8582f2"
    const isLoading = ref(false)

    const getStreak = async () => {
        isLoading.value = true

        const { data: streakData, error: streakError } = await supabaseClient
            .from('streaks')
            .select('*, streak_days(*)')
            .eq('user_id', user_id)
            .single()

        if (streakError) {
            console.error(streakError)
            isLoading.value = false
            return
        }

        streak.value = streakData
        isLoading.value = false
    }

    const checkIn = async (streakId: string) => {
        if (!streak.value) {
            console.error('No streak loaded')
            return
        }

        const { data: streakDay, error: streakError } = await supabaseClient
            .from('streak_days')
            .insert({
                streak_id: streakId
            })
            .select('*')
            .single()

        if(!streakDay) {
            console.error(streakError)
            return
        }

        streak.value.streak_days = [...streak.value.streak_days, streakDay]
    }

    const createStreak = async (name: string) => {
        isLoading.value = true
        // if (!user.value) {
        //     console.error('No user logged in')
        //     return
        // }

        const { data: streakData, error: streakError } = await supabaseClient
            .from('streaks')
            .insert({ name: name, user_id: user_id })

        if (streakError) {
            console.error(streakError)
            isLoading.value = false
            return
        }

        streak.value = streakData
        isLoading.value = false
    }

    return {
        streak,
        isLoading,
        getStreak,
        createStreak,
        checkIn
    }
}