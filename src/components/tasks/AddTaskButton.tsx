import React from 'react'
import { PlusCircle } from 'lucide-react'

export const AddTaskButton = () => {
    return (
        <button
            className='mt-4 btn btn-block btn-lg btn-neutral'>
            <PlusCircle />
            Add task
        </button>
    )
}