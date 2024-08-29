import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarScreen from '../screens/CalendarScreen';
import MyPageScreen from '../screens/MyPageScreen';
import EditDiaryScreen from '../screens/EditDiaryScreen';

type TabParamList = {
    Calendar: undefined;
    EditDiary: { date: string };
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
                    }

                    return <Icon name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#BCBCBC',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: 'white' },
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
                component={EditDiaryScreen}
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