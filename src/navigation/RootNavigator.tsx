import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import QRScanScreen from "../screens/auth/QRScanScreen";
import CreateWorkAccountScreen from "../screens/auth/CreateWorkAccountScreen";
import CreatePersonalAccountScreen from "../screens/auth/CreatePersonalAccountScreen";
import CreateBusinessAccountScreen from "../screens/auth/CreateBusinessAccountScreen";
import HomeTabsNavigator from "./HomeTabsNavigator";
import { RootStackParamList } from "./types";
import AccountTypeSelectionScreen from "../screens/auth/AccountTypeSelection";


const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [savedUserId, setSavedUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("currentUserId");
      setSavedUserId(id);
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {savedUserId ? (
        <Stack.Screen
          name='HomeTabs'
          component={HomeTabsNavigator}
          initialParams={{ userId: savedUserId }}
        />
      ) : (
        <>
        <Stack.Screen
  name="AccountTypeSelection"
  component={AccountTypeSelectionScreen}
/>
          <Stack.Screen name="QRScan" component={QRScanScreen} />
          <Stack.Screen name="CreateWorkAccount" component={CreateWorkAccountScreen} />
          <Stack.Screen name="CreatePersonalAccount" component={CreatePersonalAccountScreen} />
          <Stack.Screen name="CreateBusinessAccount" component={CreateBusinessAccountScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;