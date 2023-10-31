'use client'
import { TRPCClient } from "@/app/_trpc/TRPCProvider"
import { useEffect } from "react"
import { themeChange } from "theme-change"

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter",]

export const ThemeSelect = () => {
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    const { data: options } = TRPCClient.options.getOptions.useQuery()
    const setTheme = TRPCClient.options.setTheme.useMutation()
    return (
        <div>
            <label className="label">
                <span className="font-bold label-text text-accent-content">Theme</span>
            </label>
            <select
                data-choose-theme
                defaultValue={options?.theme ?? "dark"}
                onChange={(e) => setTheme.mutate({ theme: e.target.value })}
                className="w-full max-w-xs select select-accent">
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