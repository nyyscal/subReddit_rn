import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '../../cache'

export default function RootLayoutNav() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  
  if(!publishableKey){
    throw new Error(
      "Missing PublishableKey."
    )
  }
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
      <Slot screenOptions={{headerShown:false}}/>
      </ClerkLoaded>
    </ClerkProvider>
  )
}