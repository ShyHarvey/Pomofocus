"use client"
import React, { useEffect } from 'react';
import { Timer } from '@/components/timer/Timer';
import { useSession } from 'next-auth/react';
import { TRPCClient } from './_trpc/TRPCProvider';


export default function Home() {
  const session = useSession()
  const createOptions = TRPCClient.options.createOptions.useMutation()

  return (
    <Timer />
  )
}
