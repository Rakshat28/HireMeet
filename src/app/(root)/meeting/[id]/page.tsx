"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import LoaderUI from '@/components/LoaderUI'
import { StreamCall,StreamTheme } from '@stream-io/video-react-sdk'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import useGetCallById from '@/hooks/useGetCallById'

const MeetingPage = () => {
    const params = useParams();
    const id = params.id as string;

    const {isLoaded} = useUser();
    const [isSetupComplete,setIsSetupComplete] = useState(false);
    
    const {call, isCallLoading} = useGetCallById(id)
    if(!isLoaded || isCallLoading){
        return <LoaderUI />
    }
    if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }
    
    return (
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup onSetupComplete={()=> setIsSetupComplete(true)}/>
                ):(
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    )
}

export default MeetingPage
