"use client"
import type { TaskType } from '@/app/types/TaskType'
import { useLocalStorage } from 'usehooks-ts'


export function useLocalTasks() {
    const [tasks, setTasks] = useLocalStorage<TaskType[]>("LocalTasksPomodoro", [])
    return { tasks, setTasks }
}