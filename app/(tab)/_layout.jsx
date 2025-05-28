import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constant/colors'; // Assuming colors file has your theme colors

const TabRoot = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.button,           // #fe6601 (button color)
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.cardBackground,       // #fffaf0 (card color)
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home-outline';
          } else if (route.name === 'donate') {
            iconName = 'heart-outline';
          } else if (route.name === 'member') {
            iconName = 'people-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="donate" options={{ title: 'दान करें' }} />
      <Tabs.Screen name="index" options={{ title: 'मुख्य पृष्ठ' }} />
      <Tabs.Screen name="member" options={{ title: 'सदस्य' }} />
    </Tabs>
  );
};

export default TabRoot;
