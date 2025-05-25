import React from 'react'
import StreamClientProvider from '@/components/providers/StreamClientProvider';
import Stream from 'stream';

function Layout({children} : {children : React.ReactNode}) {
  return (
    <StreamClientProvider>
        {children}
    </StreamClientProvider>
  )
}

export default Layout
