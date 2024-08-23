import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ViewDiary: { date: string };
  EditDiary: { date: string };
};

type ViewDiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewDiary'
>;

type ViewDiaryScreenRouteProp = RouteProp<
  RootStackParamList,
  'ViewDiary'
>;

type Props = {
  navigation: ViewDiaryScreenNavigationProp;
  route: ViewDiaryScreenRouteProp;
};

function ViewDiaryScreen({ route, navigation }: Props) {
  const { date } = route.params;

  return (
    <View>
      <Text>{date}</Text>
      <Text>제목: 일기 제목</Text>
      <Text>내용: 어쩌구저쩌구 일기 내용</Text>
      <Button title="재생" onPress={() => console.log('재생')} />
      <Button title="수정하기" onPress={() => navigation.navigate('EditDiary', { date })} />
    </View>
  );
}

export default ViewDiaryScreen;
