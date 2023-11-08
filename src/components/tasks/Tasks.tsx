'use client'
import React, { useState, useEffect } from 'react'
import { Reorder } from "framer-motion"
import { Eraser, GripVertical } from 'lucide-react'
import { AddTaskButton } from './AddTaskButton'
import { useLocalTasks } from '@/hooks/useLocalTasks'
import { Task } from './Task'
import type { TaskType } from '@/app/types/TaskType'


export const Tasks = () => {

    const { Tasks, setTasks } = useLocalTasks()

    const [localTasks, setLocalTasks] = useState<TaskType[]>([])


    useEffect(() => {
        setLocalTasks(Tasks)
    }, [Tasks])

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid w-full grid-cols-2 gap-4'>
                <h4 className='self-center text-lg font-bold'>Tasks</h4>
                {/* <button className='ml-auto border-none btn btn-sm btn-ghost w-fit'><GripVertical /></button> */}
                <div className="ml-auto dropdown">
                    <label tabIndex={0} className="border-none btn btn-sm btn-ghost w-fit"><GripVertical /></label>
                    <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li><button
                            onClick={() => setTasks([])}
                            className='flex justify-between'>Clear tasks <Eraser />
                        </button></li>
                    </ul>
                </div>
            </div>
            <div className="divider"></div>
            <Reorder.Group
                axis="y"
                values={localTasks}
                onReorder={setTasks}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex flex-col w-full'>
                {localTasks.map((task, index) => {
                    return (
                        <Reorder.Item key={task.id} value={task}>
                            <Task key={task.id} {...task} />
                        </Reorder.Item>
                    )
                })}
                <AddTaskButton />
            </Reorder.Group>
        </div>
    )
}