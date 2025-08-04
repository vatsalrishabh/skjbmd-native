import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constant/colors";

// Common header styles
const commonHeaderStyle = {
  backgroundColor: "#fe6601",
  shadowColor: "transparent",
  elevation: 0,
};

const commonHeaderTitleStyle = {
  fontWeight: "bold",
  fontSize: 22,
  color: "#fff",
};

// Map route names to icons
const iconMap = {
  index: "home-outline",
  donate: "heart-outline",
  member: "people-outline",
  rzpPaymentId: "receipt-outline",
};

const TabRoot = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.button,
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.07,
          shadowRadius: 10,
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = iconMap[route.name] || "ellipse-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: commonHeaderStyle,
        headerTitleStyle: commonHeaderTitleStyle,
        headerTintColor: "#fff",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "मुख्य पृष्ठ" }} />
      <Tabs.Screen name="donate" options={{ title: "दान करें" }} />
      <Tabs.Screen name="[rzpPaymentId]" options={{ title: "रसीद" }} />
      <Tabs.Screen name="member" options={{ title: "सदस्य" }} />
    </Tabs>
  );
};

export default TabRoot;
