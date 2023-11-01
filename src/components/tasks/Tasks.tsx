import React from 'react'
import { GripVertical } from 'lucide-react'
import { Task } from './Task'
import { AddTaskButton } from './AddTaskButton'
export const Tasks = () => {
    return (
        <div className='flex flex-col items-center w-full'>
            <div className='grid w-full grid-cols-2 gap-4'>
                <h4 className='self-center text-lg font-bold'>Tasks</h4>
                <button className='ml-auto border-none btn btn-sm btn-ghost w-fit'><GripVertical /></button>
            </div>
            <div className="divider"></div>
            <div className='flex flex-col'>
                <Task />
                <Task />
                <Task />
                <Task />

                <AddTaskButton />
            </div>
        </div>
    )
}