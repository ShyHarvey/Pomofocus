"use client"
import React, { useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TimeCounter } from './TimeCounter';
import { PomodoroCounter } from './PomodoroCounter';

export const Timer = () => {
    const [tab, setTab] = useState<string>('Pomodoro');
    const [pomodoroCounter, setPomodoroCounter] = useState<number>(0);


    const onTabChange = (value: string) => {
        setTab(value);
    }
    return (
        <Tabs
            value={tab}
            onValueChange={onTabChange}
            className='flex flex-col gap-5 w-fit'
            defaultValue="Pomodoro" >
            <p className='h-1'>Pomodoros {pomodoroCounter}</p>
            <TabsList>
                <TabsTrigger value="Pomodoro">Pomodoro</TabsTrigger>
                <TabsTrigger value="Short break">Short break</TabsTrigger>
                <TabsTrigger value="Long break">Long break</TabsTrigger>
            </TabsList>
            <TabsContent value='Pomodoro'>
                <PomodoroCounter
                    time={3}
                    onTimeLeft={onTabChange}
                    pomodoroCounter={pomodoroCounter}
                    setPomodoroCounter={setPomodoroCounter}
                />
            </TabsContent>
            <TabsContent value='Short break'>
                <TimeCounter time={5} onTimeLeft={onTabChange} />
            </TabsContent>
            <TabsContent value='Long break'>
                <TimeCounter time={10} onTimeLeft={onTabChange} />
            </TabsContent>
        </Tabs>

    )
}
