import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  EditDiary: { date: string };
  ViewDiary: { date: string };
};

type EditDiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditDiary'
>;

type EditDiaryScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditDiary'
>;

type Props = {
  navigation: EditDiaryScreenNavigationProp;
  route: EditDiaryScreenRouteProp;
};

function EditDiaryScreen({ route, navigation }: Props) {
  const { date } = route.params;
  const [title, setTitle] = useState<string>('일기 제목');
  const [content, setContent] = useState<string>('어쩌구저쩌구 일기 내용');

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="일기 제목"
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="일기 내용"
        multiline
      />
      <Button
        title="확인"
        onPress={() => navigation.navigate('ViewDiary', { date })}
      />
    </View>
  );
}

export default EditDiaryScreen;
