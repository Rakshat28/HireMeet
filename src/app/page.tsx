import React from 'react'
import { SignedIn, SignInButton ,SignOutButton, SignUpButton,SignedOut} from '@clerk/nextjs'

const HomePage = () => {
  return (
    <div>
      HomePage
      <SignedOut>
              <SignInButton />
              <SignUpButton />
      </SignedOut>
      <SignedIn>
              <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default HomePage
