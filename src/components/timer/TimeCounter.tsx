"use client"
import React, { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';
export const TimeCounter = ({
    time,
    onTimeLeft
}:
    {
        time: number
        onTimeLeft: (value: 'Pomodoro' | "Short break" | "Long break") => void
    }) => {
    const [timeLeft, setTimeLeft] = useState<number>(time); // seconds
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(true) // добавить условие
        if (isActive) {
            let interval = setInterval(() => {
                setTimeLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);

            if (timeLeft === 0) {
                clearInterval(interval);

                setTimeout(() => {
                    setIsActive(false)
                    setTimeLeft(time)
                    onTimeLeft('Pomodoro')
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