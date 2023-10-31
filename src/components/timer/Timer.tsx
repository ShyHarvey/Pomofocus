"use client"
import React, { useEffect, useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TimeCounter } from './TimeCounter';
import { PomodoroCounter } from './PomodoroCounter';
import { TRPCClient } from '@/app/_trpc/TRPCProvider';

export const Timer = () => {
    const [tab, setTab] = useState<string>('Pomodoro');
    const [pomodoroCounter, setPomodoroCounter] = useState<number>(0);
    const { data: options } = TRPCClient.options.getOptions.useQuery()

    const onTabChange = (value: string) => {
        setTab(value);
    }

    return (
        <Tabs
            value={tab}
            onValueChange={onTabChange}
            className='flex flex-col gap-5 w-fit'
            defaultValue="Pomodoro" >
            <TabsList>
                <TabsTrigger className='px-1 sm:px-4' value="Pomodoro">Pomodoro</TabsTrigger>
                <TabsTrigger className='px-1 sm:px-4' value="Short break">Short break</TabsTrigger>
                <TabsTrigger className='px-1 sm:px-4' value="Long break">Long break</TabsTrigger>
            </TabsList>
            <TabsContent value='Pomodoro'>
                <PomodoroCounter
                    autoStart={options?.isAutoStartPomodoros ?? false}
                    time={(options?.timing[0] ?? 25) * 60}
                    onTimeLeft={onTabChange}
                    pomodoroCounter={pomodoroCounter}
                    setPomodoroCounter={setPomodoroCounter}
                />
            </TabsContent>
            <TabsContent value='Short break'>
                <TimeCounter
                    autoStart={options?.isAutoStartBreaks ?? false}
                    time={(options?.timing[1] ?? 5) * 60}
                    onTimeLeft={onTabChange} />
            </TabsContent>
            <TabsContent value='Long break'>
                <TimeCounter
                    autoStart={options?.isAutoStartBreaks ?? false}
                    time={(options?.timing[2] ?? 15) * 60}
                    onTimeLeft={onTabChange} />
            </TabsContent>
        </Tabs>

    )
}
