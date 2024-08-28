import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SaveRecording: undefined;
  ViewDiary: { date: string };
};

type SaveRecordingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SaveRecording'
>;

type Props = {
  navigation: SaveRecordingScreenNavigationProp;
};

function SaveRecordingScreen({ navigation }: Props) {
  React.useEffect(() => {
    // 녹음 저장 시뮬레이션
    setTimeout(() => {
      navigation.navigate('ViewDiary', { date: '2024-07-14' }); // 저장 후 다섯 번째 화면으로 이동
    }, 2000); // 2초 후 저장 완료
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>일기를 작성하는 중입니다...</Text>
    </View>
  );
}

export default SaveRecordingScreen;
