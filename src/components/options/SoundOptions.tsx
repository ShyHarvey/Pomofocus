"use client"

import { useDebounce } from '@/hooks/useDebounce';
import { useSound } from '@/hooks/useSound';
import { Howl, Howler } from 'howler';
import { useEffect, useRef, useState } from 'react';



export const SoundOptions = () => {
    const {
        currentSound,
        setCurrentSound,
        volume,
        setVolume } = useSound()
    const soundState = new Howl({
        src: ['sprites.m4a'],
        sprite: {
            arcadeBonus: [0, 2000],
            happyBells: [2000, 3000],
        }
    });
    const soundRef = useRef<Howl | null>(soundState);

    const [localVolume, setLocalVolume] = useState(10)
    // const debouncedVolume = useDebounce<number>(localVolume, 200)
    useEffect(() => {
        setLocalVolume(volume)
    }, [volume])

    // useEffect(() => {
    //     setVolume(localVolume)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debouncedVolume])


    Howler.volume(localVolume / 100)
    return (
        <div className='my-3'>
            <p className='font-bold text-accent-content'>Sound</p>
            <select value={currentSound}
                onChange={(e) => {
                    setCurrentSound(e.currentTarget.value)
                    soundRef.current?.play(e.currentTarget.value)
                }}
                className="w-full max-w-xs select select-bordered">
                <option selected={currentSound === 'arcadeBonus'} value={'arcadeBonus'}>Arcade bonus</option>
                <option selected={currentSound === 'happyBells'} value={'happyBells'}>Happy bells</option>
            </select>
            <p className='font-bold text-accent-content'>Volume</p>
            <p className='font-bold text-accent-content'>{localVolume}</p>
            <input type="range" min={0} max="100" value={localVolume}
                onChange={(e) => {
                    if (soundRef.current && !soundRef.current.playing()) {
                        soundRef.current.play(currentSound);
                    }
                    setVolume(+e.currentTarget.value)
                }}
                className="w-1/2 range" />
        </div>
    )
}