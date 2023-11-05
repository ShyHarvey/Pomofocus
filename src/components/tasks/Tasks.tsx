'use client'
import React, { useState, useEffect, Suspense } from 'react'
import { GripVertical } from 'lucide-react'
import { AddTaskButton } from './AddTaskButton'
import { useLocalTasks } from '@/hooks/useLocalTasks'
import { Task } from './Task'
import { TaskType } from '@/app/types/TaskType'
export const Tasks = () => {
    const { Tasks, setTasks } = useLocalTasks()
    const [LocalTasks, SetLocalTasks] = useState<TaskType[]>([])
    useEffect(() => {
        SetLocalTasks(Tasks)
    }, [Tasks])
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid w-full grid-cols-2 gap-4'>
                <h4 className='self-center text-lg font-bold'>Tasks</h4>
                <button className='ml-auto border-none btn btn-sm btn-ghost w-fit'><GripVertical /></button>
            </div>
            <div className="divider"></div>
            <div
                className='flex flex-col w-full'>
                {LocalTasks.map((task, index) => <Task key={index} {...task} />)}
                <AddTaskButton />
            </div>
        </div>
    )
}