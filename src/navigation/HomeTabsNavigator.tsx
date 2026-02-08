import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import ScanScreen from '../screens/home/ScanScreen';
import MyContactsScreen from '../screens/home/MyContactsScreen';
import SettingsScreen from '../screens/home/SettingsScreen';

import { HomeTabsParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<HomeTabsParamList>();

type HomeTabsNavigatorProps = {
  route: RouteProp<RootStackParamList, 'HomeTabs'>;
};

const HomeTabsNavigator = ({ route }: HomeTabsNavigatorProps) => {
  const { userId } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userId }}
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'بحث',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: 'مسح',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MyContacts"
        component={MyContactsScreen}
        options={{
          title: 'جهات الاتصال',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
                initialParams={{ userId }}

        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;