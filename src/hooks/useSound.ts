import { useLocalStorage } from 'usehooks-ts'
import { Howl, Howler } from 'howler';

export function useSound() {
    const soundState = new Howl({
        src: ['sprites.m4a'],
        sprite: {
            arcadeBonus: [0, 2000],
            happyBells: [2000, 3000],
        }
    });

    const [currentSound, setCurrentSound] = useLocalStorage<string>('currentSound', '')
    const [volume, setVolume] = useLocalStorage<number>('volume', 10)
    return { soundState, currentSound, setCurrentSound, volume, setVolume }
}