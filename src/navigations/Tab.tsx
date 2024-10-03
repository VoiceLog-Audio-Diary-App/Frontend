import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarScreen from '../screens/CalendarScreen';
import MyPageScreen from '../screens/MyPageScreen';
import DiaryStack from './DiaryStack';
import moment from 'moment';

type TabParamList = {
  Calendar: undefined;
  Diary: { selectedDate?: string };
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = 'event';
          } else if (route.name === 'Diary') {
            iconName = 'book';
          } else if (route.name === 'MyPage') {
            iconName = 'person';
          } else if (route.name === 'EditDiary') {
            iconName = 'edit';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#BCBCBC',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryStack}
        initialParams={{ selectedDate: moment().format('YYYY-MM-DD') }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
