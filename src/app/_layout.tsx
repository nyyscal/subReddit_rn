import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '../../cache'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {useReactQueryDevTools} from "@dev-plugins/react-query"

export default function RootLayoutNav() {

  const queryClient = new QueryClient()

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  useReactQueryDevTools(queryClient)
  
  if(!publishableKey){
    throw new Error(
      "Missing PublishableKey."
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
      <Slot screenOptions={{headerShown:false}}/>
      </ClerkLoaded>
    </ClerkProvider>
    </QueryClientProvider>
  )
}