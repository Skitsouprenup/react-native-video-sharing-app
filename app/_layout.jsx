import { Stack } from "expo-router";
import GlobalProvider from "@/context/GlobalContext";

/*
  Stack if a fundamental way of creating a navigation.
  Navigating using stack gives our routes an animation
  everytime we move from one page to another.
*/
export default function App() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  )
}