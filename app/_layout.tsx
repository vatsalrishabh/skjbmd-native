import { Stack } from 'expo-router';
import colors from '../constant/colors'; // adjust path as per your structure

// Optional immersive mode setup (commented out)
// let ImmersiveMode: any;
// if (Platform.OS === 'android') {
//   ImmersiveMode = require('react-native-immersive').default;
// }

export default function RootLayout() {
  // Optional immersive mode effect
  // useEffect(() => {
  //   if (Platform.OS === 'android' && ImmersiveMode) {
  //     ImmersiveMode.fullLayout(true);
  //     ImmersiveMode.setBarMode('FullSticky');
  //     ImmersiveMode.enterImmersive();
  //   }
  // }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
        headerTitleStyle: {
          color: colors.headingText,
          fontWeight: 'bold',
        },
        headerTintColor: colors.headingText, // Back button color
        contentStyle: {
          backgroundColor: colors.cardBackground,
        },
      }}
    >
     <Stack.Screen
  name="index"
  options={{
    title: "मुख्य पृष्ठ",
    headerStyle: {
      backgroundColor: '#101828', // dark background (e.g., dark navy)
    },
    headerTintColor: '#ffffff', // white text/icons
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  }}
/>

      <Stack.Screen name="donate" options={{ title: "दान करें" }} />
      <Stack.Screen name="[rzpPaymentId]" options={{ title: "रसीद" }} />
      <Stack.Screen name="member" options={{ title: "सदस्य" }} />
      <Stack.Screen name="chat" options={{ title: "चैटिंग" }} />
    </Stack>
  );
}
