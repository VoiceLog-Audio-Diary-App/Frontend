import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Calendar: undefined;
  Recording: { date: string };
  ViewDiary: { date: string };
};

type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendar'
>;

type Props = {
  navigation: CalendarScreenNavigationProp;
};

function CalendarScreen({ navigation }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const datesWithDiary = ['2024-07-14', '2024-07-17']; // 일기가 작성된 날짜

  const handleDatePress = (date: string) => {
    setSelectedDate(date);
    if (datesWithDiary.includes(date)) {
      Alert.alert(`${date}에 작성된 일기가 있습니다.`, '일기를 확인하시겠습니까?', [
        { text: '아니오', onPress: () => console.log('취소됨') },
        { text: '예', onPress: () => navigation.navigate('ViewDiary', { date }) },
      ]);
    } else {
      navigation.navigate('Recording', { date });
    }
  };

  return (
    <View>
      <Text>캘린더</Text>
      {/* 캘린더 표시, 예시로 날짜 버튼  */}
      <TouchableOpacity onPress={() => handleDatePress('2024-07-14')}>
        <Text>2024/07/14</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDatePress('2024-07-17')}>
        <Text>2024/07/17</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CalendarScreen;
