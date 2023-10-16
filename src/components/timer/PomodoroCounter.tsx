"use client"
import React, { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';


const longBreakInterval = 4

export const PomodoroCounter = ({
    time,
    onTimeLeft,
    pomodoroCounter,
    setPomodoroCounter
}:
    {
        time: number,
        onTimeLeft: (value: 'Pomodoro' | "Short break" | "Long break") => void,
        pomodoroCounter: number,
        setPomodoroCounter: React.Dispatch<React.SetStateAction<number>>
    }) => {
    const [timeLeft, setTimeLeft] = useState<number>(time); // seconds
    const [isActive, setIsActive] = useState<boolean>(false);


    useEffect(() => {
        setIsActive(true) // добавить условие
    }, [])

    useEffect(() => {
        if (isActive) {
            let interval = setInterval(() => {
                setTimeLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);

            if (timeLeft === 0) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsActive(false)
                    setTimeLeft(time)
                    setPomodoroCounter(prev => prev + 1)
                    if (pomodoroCounter < longBreakInterval - 1) {
                        onTimeLeft('Short break')
                    } else {
                        setPomodoroCounter(0)
                        onTimeLeft('Long break')
                    }
                }, 1500)
            }
            return () => {
                clearInterval(interval);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, time, timeLeft]);

    const startTimer = (): void => {
        setIsActive(true);
    };

    const stopTimer = (): void => {
        setIsActive(false);
    };

    const { minutes, seconds } = formatTime(timeLeft);

    return (

        <div className='flex flex-col gap-5'>
            <div className='font-semibold text-neutral-content text-9xl'>
                <span className="font-mono countdown">
                    <span style={{ "--value": minutes }}></span>:
                    <span style={{ "--value": seconds }}></span>
                </span>
            </div>

            <div className='flex justify-around gap-2'>
                {isActive ?
                    <button className='w-2/5 btn btn-secondary no-animation' onClick={stopTimer}>Pause</button>
                    :
                    <button className='w-2/5 btn btn-primary no-animation' onClick={startTimer}>Start</button>
                }
            </div>

        </div>
    )
}