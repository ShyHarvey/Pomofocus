"use client"
import React, { useEffect } from 'react';
import { Timer } from '@/components/timer/Timer';
import { useSession } from 'next-auth/react';
import { TRPCClient } from './_trpc/TRPCProvider';
import { Tasks } from '@/components/tasks/Tasks';


export default function Home() {
  const session = useSession()
  // const createOptions = TRPCClient.options.createOptions.useMutation()

  return (
    <>
      <div className='flex items-center justify-center max-w-xl p-6 mx-auto rounded-lg shadow-xl bg-neutral sm:p-14 '>
        <Timer />
      </div>
      <div className='flex items-center justify-center w-full max-w-xl p-2 mx-auto sm:p-4 '>
        <Tasks />
      </div>
    </>
  )
}
