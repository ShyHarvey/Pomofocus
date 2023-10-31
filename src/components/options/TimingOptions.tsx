'use client'
import { TRPCClient } from '@/app/_trpc/TRPCProvider'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/components/ui/toast/use-toast';
import { ToastAction } from '@/components/ui/toast/toast';


type FormValues = {
    pomodoro: number
    shortBreak: number
    longBreak: number
}

export const TimingOptions: React.FC<{}> = () => {
    const { toast } = useToast()
    const { refetch: refetchOptions, data: optionsData } = TRPCClient.options.getOptions.useQuery()
    const { mutate } = TRPCClient.options.setTiming.useMutation({
        onSuccess: () => refetchOptions(),
        onError(error) {
            toast({
                variant: 'destructive',
                title: "TRPCError",
                description: error.message,
                action: (
                    <ToastAction altText="Goto schedule to undo">Close</ToastAction>
                ),
            })
        },
    })
    const [fields, setFields] = useState<number[]>([])
    const debouncedFields = useDebounce(fields, 1000)

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15
        },

    })
    const { onChange: onChangePomodoro } = register("pomodoro", { min: 0 })
    const { onChange: onChangeShortBreak } = register("shortBreak", { min: 0 })
    const { onChange: onChangeLongBreak } = register("longBreak", { min: 0 })

    useEffect(() => {
        if (optionsData) {
            setValue("pomodoro", optionsData?.timing[0])
            setValue("shortBreak", optionsData?.timing[1])
            setValue('longBreak', optionsData?.timing[2])
        }
    }, [optionsData, setValue])

    useEffect(() => {
        if (debouncedFields.length > 0) {
            mutate({ timing: debouncedFields })
        }
    }, [debouncedFields, mutate])

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log([data.pomodoro, data.shortBreak, data.longBreak])
        setFields([+data.pomodoro, +data.shortBreak, +data.longBreak])
    }
    const submitFunc = handleSubmit(onSubmit)

    return (
        <>
            <h4 className='mt-3 font-bold label-text text-accent-content'>{'Timing (minutes)'}</h4>
            <div className='grid grid-cols-3 gap-5'>
                <div className="self-end w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text text-accent-content">Pomodoro</span>
                    </label>
                    <input
                        {...register("pomodoro", {
                            min: 0
                        })}
                        onChange={(e) => {
                            onChangePomodoro(e)
                            // submitFunc()
                            handleSubmit(onSubmit)() //выглядит странно, но тоже работает
                        }}
                        type="number"
                        min={0}
                        className="w-full max-w-xs px-1 input input-bordered md:px-4" />
                </div>
                <div className="self-end w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text text-accent-content">Short Break</span>
                    </label>
                    <input
                        {...register("shortBreak", {
                            min: 0
                        })}
                        onChange={(e) => {
                            onChangeShortBreak(e)
                            submitFunc()
                        }}
                        type="number"
                        min={0}
                        className="w-full max-w-xs px-1 input input-bordered md:px-4" />
                </div>
                <div className="self-end w-full max-w-xs form-control">
                    <label className="label">
                        <span className="label-text text-accent-content">Long Break</span>
                    </label>
                    <input
                        {...register("longBreak", {
                            min: 0
                        })}
                        onChange={(e) => {
                            onChangeLongBreak(e)
                            submitFunc()
                        }}
                        type="number"
                        min={0}
                        className="w-full max-w-xs px-1 input input-bordered md:px-4" />
                </div>
                {/* <button className='self-end btn-neutral btn' onClick={handleSubmit(onSubmit)}>save</button> */}
            </div>
        </>
    )
}