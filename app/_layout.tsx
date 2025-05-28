import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
         <Stack.Screen name="(drawer)" />
        <Stack.Screen name="(tab)" options={{headerShown:false}}/>
         <Stack.Screen name="index" options={{headerShown:true}}/>
    </Stack>
  );
}
