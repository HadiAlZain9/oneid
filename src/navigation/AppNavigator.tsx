import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountTypeSelection from '../screens/auth/AccountTypeSelection';
import QRScanScreen from '../screens/auth/QRScanScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import HomeTabsNavigator from './HomeTabsNavigator';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QRScan">
           <Stack.Screen
                  name="AccountTypeSelection"
                  component={AccountTypeSelection}
                  options={{ title: 'نوع الحساب' }}
                />
        <Stack.Screen
          name="QRScan"
          component={QRScanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ title: 'إنشاء حساب' }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabsNavigator}
          options={{ headerShown: false }}
        />
        
             
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;