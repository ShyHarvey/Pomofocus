'use client'
import { TRPCClient } from '@/app/_trpc/TRPCProvider'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/components/ui/toast/use-toast';
import { ToastAction } from '@/components/ui/toast/toast';


type FormValues = {
    isAutoStartPomodoros: boolean
    isAutoStartBreaks: boolean
}

export const AutoStartOptions: React.FC<{}> = () => {
    const { toast } = useToast()
    const { refetch: refetchOptions, data: optionsData } = TRPCClient.options.getOptions.useQuery()
    const { mutate } = TRPCClient.options.setIsAutoStartOptions.useMutation({
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

    const { register, handleSubmit, setValue } = useForm<FormValues>()
    const { onChange: onChangeShortBreak } = register("isAutoStartBreaks")
    const { onChange: onChangePomodoro } = register("isAutoStartPomodoros",)

    useEffect(() => {
        if (optionsData) {
            setValue("isAutoStartPomodoros", optionsData?.isAutoStartPomodoros)
            setValue("isAutoStartBreaks", optionsData?.isAutoStartBreaks)
        }
    }, [optionsData, setValue])

    const [fields, setFields] = useState<FormValues>()
    const debouncedFields = useDebounce(fields, 500)
    useEffect(() => {
        if (debouncedFields) {
            mutate({
                isAutoStartBreaks: debouncedFields.isAutoStartBreaks,
                isAutoStartPomodoros: debouncedFields.isAutoStartPomodoros
            })
        }
    }, [debouncedFields, mutate])

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log({
            pomodoros: !!data.isAutoStartPomodoros,
            breaks: !!data.isAutoStartBreaks
        })
        setFields({
            isAutoStartBreaks: !!data.isAutoStartBreaks,
            isAutoStartPomodoros: !!data.isAutoStartPomodoros
        })
    }
    const submitFunc = handleSubmit(onSubmit)

    return (
        <>
            <div className='grid grid-cols-2 gap-5'>
                <div className="self-end w-full max-w-xs form-control">
                    <label className="label">
                        <span className="mt-3 font-bold label-text text-accent-content">Auto start Pomodoros</span>
                    </label>
                    <input
                        {...register("isAutoStartPomodoros")}
                        onChange={(e) => {
                            onChangePomodoro(e)
                            // submitFunc()
                            handleSubmit(onSubmit)() //выглядит странно, но тоже работает
                        }}
                        value={"Pomodoros"}
                        defaultChecked={optionsData?.isAutoStartBreaks}
                        type="checkbox"
                        className="toggle toggle-lg" />
                </div>
                <div className="self-end w-full max-w-xs form-control">
                    <label className="label">
                        <span className="mt-3 font-bold label-text text-accent-content">Auto start breaks</span>
                    </label>
                    <input
                        {...register("isAutoStartBreaks")}
                        onChange={(e) => {
                            onChangeShortBreak(e)
                            submitFunc()
                        }}
                        value={"Breaks"}
                        type="checkbox"
                        defaultChecked={optionsData?.isAutoStartBreaks}
                        className="toggle toggle-lg"
                    />
                </div>
                {/* <button className='self-end btn-neutral btn' onClick={handleSubmit(onSubmit)}>save</button> */}
            </div>
        </>
    )
}