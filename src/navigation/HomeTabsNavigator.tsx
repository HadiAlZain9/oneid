import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

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

const HomeTabsNavigator: React.FC<HomeTabsNavigatorProps> = ({ route }) => {
  const { userId } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ userId }}
        options={{ title: 'الرئيسية' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        initialParams={{ userId }}
        options={{ title: 'بحث' }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        initialParams={{ userId }}
        options={{ title: 'مسح' }}
      />
      <Tab.Screen
        name="MyContacts"
        component={MyContactsScreen}
        initialParams={{ userId }}
        options={{ title: 'جهات الاتصال' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{ userId }}
        options={{ title: 'الإعدادات' }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;