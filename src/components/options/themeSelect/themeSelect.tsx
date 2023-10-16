'use client'
import { useEffect } from "react"
import { themeChange } from "theme-change"

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",]

export const ThemeSelect = () => {
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    return (
        <div>
            <label className="label">
                <span className="font-bold label-text text-accent-content">Theme</span>
            </label>
            <select data-choose-theme defaultValue={"dark"} className="w-full max-w-xs select select-accent">
                {themes.map(theme => (
                    <option
                        data-theme={theme}
                        key={theme}
                        value={theme}
                    >
                        {theme}
                    </option>
                ))}
            </select>
        </div>
    )
}