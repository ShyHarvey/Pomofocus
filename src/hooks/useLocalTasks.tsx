"use client"
import type { TaskType } from '@/app/types/TaskType'
import { useLocalStorage } from 'usehooks-ts'


export function useLocalTasks() {
    const [Tasks, setTasks] = useLocalStorage<TaskType[]>("LocalTasksPomodoro", [])
    return { Tasks, setTasks }
}