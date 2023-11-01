'use client'
import React, { useState, useRef } from 'react'
import { Check, Pencil } from 'lucide-react'
import { useOnClickOutside } from 'usehooks-ts'
import { cn } from '@/lib/utils'

export const Task = () => {
    const ref = useRef(null)
    const [isDone, setIsDone] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const handleClickOutside = () => {
        console.log("click outside")
        setIsEditing(false)
    }

    useOnClickOutside(ref, handleClickOutside)

    if (isEditing) {
        return (
            <div
                ref={ref}
                className={cn(
                    "transition-all border-l-4 border-base-100 shadow-xl my-1 card bg-base-100"
                )}>
                <div className='card-body'>
                    <h2 className="card-title">Editing</h2>
                    <div className="w-full form-control">
                        <input type="text" placeholder="Title" className="w-full input input-bordered" />
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Note"></textarea>
                    <div className="justify-end card-actions">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className='btn btn-ghost btn-sm'>
                            Close
                        </button>
                        <button className='btn btn-sm'>Save</button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={cn(
            "transition-all duration-100 border-l-4 shadow-xl my-1 cursor-pointer card card-side border-primary bg-base-100",
            isActive ? "border-primary" : "border-primary/10 hover:border-primary/50"
        )}
            onClick={() => setIsActive(!isActive)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsDone(!isDone)
                }}
                className={cn(
                    'self-center btn btn-sm ml-2 btn-circle transition-colors duration-200',
                    isDone ? 'btn-primary' : 'btn-ghost'
                )}
            >
                <Check />
            </button>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsEditing(!isEditing)
                }}
                className='self-start mt-2 ml-2 mr-2 btn btn-sm btn-circle btn-ghost'>
                <Pencil size={15} />
            </button>
        </div>
    )
}