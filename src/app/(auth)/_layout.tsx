import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if(isSignedIn){
    return <Redirect href={"/"}/>
  }

  return <Stack>
    <Stack.Screen name="signIn" options={{title:"Sign In"}}/>
    <Stack.Screen name="signUp" options={{title:"Sign Up"}}/>
  </Stack>;
}
