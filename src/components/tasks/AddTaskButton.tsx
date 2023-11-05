'use client'
import React, { useState, useRef } from 'react'
import { PlusCircle } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { useLocalTasks } from '@/hooks/useLocalTasks'
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

type FormValues = {
    title: string,
    note: string
}

export const AddTaskButton = () => {
    const ref = useRef(null)
    const [isAdding, setIsAdding] = useState(false)
    const { Tasks, setTasks } = useLocalTasks()

    const handleClickOutside = () => {
        setIsAdding(false)
    }
    useOnClickOutside(ref, handleClickOutside)

    const { register, handleSubmit, setValue } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setValue("title", "")
        setValue("note", "")
        console.log({
            title: data.title,
            note: data.note
        })

        setTasks([
            ...Tasks,
            {
                id: uuidv4(),
                actPomodoro: 0,
                estPomodoro: 1,
                note: data.note,
                title: data.title,
                order: Tasks.length,
                projectName: ''
            }
        ])
    }

    if (isAdding) {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    ref={ref}
                    className={cn(
                        "transition-all border-l-4 border-base-100 shadow-xl my-1 card bg-base-100"
                    )}>
                    <div className='card-body'>
                        <div className="w-full form-control">

                            <input
                                {...register("title", { required: true })}
                                type="text"
                                placeholder="Title"
                                className="w-full input input-bordered"
                                minLength={1} />
                        </div>
                        <textarea
                            {...register("note", { minLength: 1 })}
                            className="textarea textarea-bordered"
                            placeholder="Note"></textarea>
                        <div className="justify-end card-actions">
                            <button
                                onClick={() => setIsAdding(false)}
                                className='btn btn-ghost btn-sm'>
                                Close
                            </button>
                            <button type='submit' className='btn btn-sm'>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <button
            onClick={() => setIsAdding(true)}
            className='mt-4 btn btn-block btn-lg btn-neutral'>
            <PlusCircle />
            Add task
        </button>
    )
}