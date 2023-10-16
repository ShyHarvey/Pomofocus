'use client'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const ProfileButton = () => {

    const { data: session } = useSession()

    if (session) {
        return (
            <div className="dropdown dropdown-end">
                <label tabIndex={0} >
                    <Avatar className='rounded cursor-pointer ring-primary hover:ring'>
                        <AvatarImage src={session.user?.image || ''} />
                        <AvatarFallback>{
                            session.user?.name ?
                                session.user?.name[0] + session.user?.name[1]
                                :
                                'AV'
                        }</AvatarFallback>
                    </Avatar>
                </label>
                <ul tabIndex={0} className="z-10 w-56 dropdown-content menu bg-base-200 rounded-box">
                    <li><button onClick={() => signOut()}>Sign out</button></li>
                </ul>
            </div>
        )
    }

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} >
                <Avatar className='rounded cursor-pointer ring-primary hover:ring'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </label>
            <ul tabIndex={0} className="z-10 w-56 dropdown-content menu bg-base-200 rounded-box">
                <li><button onClick={() => signIn()}>Sign in</button></li>
            </ul>
        </div>
    )
}