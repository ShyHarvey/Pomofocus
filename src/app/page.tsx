"use client"
import React, { useState, useEffect } from 'react';
import { formatTime } from '@/lib/utils';
import Link from 'next/link';
import { Timer } from '@/components/timer/Timer';


export default function Home() {

  return (

    <Timer />
  )
}
