<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStreak } from "../hooks/useStreak.ts";
import dayjs from "dayjs";
import WeekDays from "../components/WeekDays.vue";
import StreakCreateForm from "../components/StreakCreateForm.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

const { streak, isLoading, getStreak, checkIn } = useStreak()

const today = ref(dayjs());

const doCheckIn = async () => {
  if (!streak.value) {
    return
  }

  await checkIn(streak.value.id)
}

const hasCheckedInToday = computed(() => {
  if (!streak.value) {
    return false
  }

  return streak.value.streak_days.some(streakDay => dayjs(streakDay.created_at).isSame(today.value, 'day'))
})

const getCurrentWeekDays = (): string[] => {
  const startOfWeek = today.value.startOf('week');

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, 'day').format("D"));
  }

  return days;
}

const currenWeekDays = ref(getCurrentWeekDays())

const isDayCheckedIn = (day: string) => {
  return streak.value?.streak_days.some(streakDay => dayjs(streakDay.created_at).date().toString() === day)
}

onMounted(() => {
  getStreak()
})
</script>

<template>
  <div>
    <div v-if="isLoading">
      <LoadingIndicator />
    </div>

    <div class="p-10" v-else-if="streak">
      <div>
        <h1 class="text-2xl font-medium">
          {{ streak.name }}
        </h1>

        <WeekDays />

        <div class="flex justify-center gap-2">
          <div v-for="day in currenWeekDays" :key="day"
               class="text-center px-4 w-20 py-2 rounded-md"
               :class="{
                  'text-orange-400 font-medium': isDayCheckedIn(day),
               }"
          >
            {{ day }}
          </div>
        </div>

        <div class="fixed bottom-5 left-1/2 -translate-x-1/2" v-if="!hasCheckedInToday">
          <button class="rounded-full px-5 py-2 bg-white text-black hover:bg-neutral-200 font-medium text-sm" @click="doCheckIn">
            Check in
          </button>
        </div>
      </div>
    </div>

    <StreakCreateForm v-else />
  </div>
</template>
