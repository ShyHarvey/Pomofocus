'use client'
import React, { useState, useRef } from 'react'
import { Activity, Check, Grip, Pencil } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import type { TaskType } from '@/app/types/TaskType'
import { useLocalTasks } from '@/hooks/useLocalTasks'
import { SubmitHandler, useForm } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion"


type FormValues = {
    title: string,
    note: string
}

export const Task = (
    {
        id,
        title,
        estPomodoro,
        actPomodoro,
        note,
        projectName,
        order,
        reorderItem
    }: {
        id: string;
        title: string;
        estPomodoro: number;
        actPomodoro: number;
        note: string;
        projectName: string;
        order: number;
        reorderItem: TaskType
    }) => {
    const clickOutsideRef = useRef<HTMLDivElement>(null)
    const [isDone, setIsDone] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const { tasks, setTasks } = useLocalTasks()

    const controls = useDragControls()

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            note: note,
            title: title
        }
    })
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    title: data.title,
                    note: data.note
                };
            }
            return task;
        });

        setTasks(updatedTasks);
        setIsEditing(false);
    }


    const onDelete = () => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)
    }

    const handleClickOutside = () => {
        setIsEditing(false)
    }

    useOnClickOutside(clickOutsideRef, handleClickOutside)

    const scrollToCenter = () => {
        //таймаут нужен чтобы сначала таска сменилась на
        // форму, а уже потом проскроллилась. Иначе скролл работает криво
        setTimeout(() => {
            if (clickOutsideRef.current) {
                clickOutsideRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 0)
    }

    if (isEditing) {
        return (
            <div
                onSubmit={handleSubmit(onSubmit)}
                ref={clickOutsideRef}
                className={cn(
                    "transition-all border-l-4 border-base-100 shadow-xl my-1 card bg-base-100"
                )}>
                <form className='card-body'>
                    <div className="w-full form-control">
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Title"
                            className="w-full input input-bordered" />
                    </div>
                    <textarea
                        {...register("note")}
                        className="textarea textarea-bordered" placeholder="Note"></textarea>
                    <div className='flex justify-between'>
                        <button
                            onClick={onDelete}
                            className='btn btn-sm btn-ghost'>
                            Delete
                        </button>
                        <div className="justify-end card-actions">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className='btn btn-ghost btn-sm'>
                                Close
                            </button>
                            <button type='submit' className='btn btn-sm'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }



    return (
        <Reorder.Item
            value={reorderItem}
            dragListener={false}
            dragControls={controls}
        >

            <div
                ref={clickOutsideRef}
                className={cn(
                    "transition-all duration-100 border-l-4 shadow-xl my-1 card card-side border-primary bg-base-100",
                    isActive ? "border-primary" : "border-primary/10 hover:border-primary/50"
                )}
            >
                <div className='flex flex-col justify-around'>
                    <div className="sm:tooltip" data-tip={isActive ? "make inactive" : "make active"}>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className='self-start ml-2 mr-2 btn btn-sm btn-circle btn-ghost'>
                            <Activity size={16} />
                        </button>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsDone(!isDone)
                        }}
                        className={cn(
                            'self-center btn btn-sm ml-2 btn-circle transition-colors  duration-200',
                            isDone ? 'btn-primary' : 'btn-ghost opacity-30'
                        )}
                    >
                        <Check />
                    </button>
                </div>
                <div className=" card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{note}</p>
                </div>
                <div className='flex flex-col justify-around'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsEditing(!isEditing)
                            scrollToCenter()
                        }}
                        className='self-start ml-2 mr-2 btn btn-sm btn-circle btn-ghost'>
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => controls.start(e)}
                        className='self-start hidden ml-2 mr-2 cursor-grab btn btn-sm btn-circle btn-ghost sm:block'>
                        <Grip size={20} />
                    </button>
                    <p><span>{actPomodoro}</span><span className='opacity-50'>/{estPomodoro}</span></p>
                </div>
            </div>
        </Reorder.Item>
    )
}

