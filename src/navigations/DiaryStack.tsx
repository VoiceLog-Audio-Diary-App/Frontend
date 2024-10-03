import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecordingScreen from '../screens/RecordingScreen';
import ViewDiaryScreen from '../screens/ViewDiaryScreen';
import EditDiaryScreen from '../screens/EditDiaryScreen'; // 추가된 부분
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const DiaryStack = ({ route }) => {
  const [initialRoute, setInitialRoute] = useState<'Recording' | 'ViewDiary' | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // 매번 route.params에서 선택된 날짜를 가져오고, 기본값은 오늘 날짜로 설정합니다.
    const date = route?.params?.selectedDate || moment().format('YYYY-MM-DD');
    setSelectedDate(date);

    const checkDiaryEntry = async () => {
      try {
        const diaryEntry = await AsyncStorage.getItem(date);
        if (diaryEntry) {
          setInitialRoute('ViewDiary');
        } else {
          setInitialRoute('Recording');
        }
      } catch (error) {
        console.error('Error checking diary entry:', error);
        setInitialRoute('Recording');
      }
    };

    checkDiaryEntry();
  }, [route.params]);

  // 데이터를 확인 중일 때는 로딩 인디케이터를 보여줍니다.
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        initialParams={{ selectedDate }} // 선택된 날짜 전달
        options={{ title: '녹음하기' }}
      />
      <Stack.Screen
        name="ViewDiary"
        component={ViewDiaryScreen}
        initialParams={{ selectedDate }} // 선택된 날짜 전달
        options={{ title: '일기 보기' }}
      />
      <Stack.Screen
        name="EditDiary"
        component={EditDiaryScreen}
        initialParams={{ selectedDate }} // 선택된 날짜 전달
        options={{ title: '일기 수정' }}
      />
    </Stack.Navigator>
  );
};

export default DiaryStack;
