import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Recording: { date: string };
  SaveRecording: undefined;
};

type RecordingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Recording'
>;

type RecordingScreenRouteProp = RouteProp<
  RootStackParamList,
  'Recording'
>;

type Props = {
  navigation: RecordingScreenNavigationProp;
  route: RecordingScreenRouteProp;
};

function RecordingScreen({ route, navigation }: Props) {
  const { date } = route.params;
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleRecordButtonPress = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    Alert.alert('일기 작성을 종료하시겠어요?', '종료 시 AI가 일기를 작성해주며 토큰이 차감됩니다.', [
      { text: '아니오', onPress: () => console.log('취소됨') },
      { text: '종료하기', onPress: () => navigation.navigate('SaveRecording') },
    ]);
  };

  return (
    <View>
      <Text>{date}</Text>
      <Text>{isRecording ? '녹음 중...' : '녹음 준비 중...'}</Text>
      <Button title={isRecording ? '정지' : '녹음 시작'} onPress={handleRecordButtonPress} />
      {isRecording && <Button title="정지" onPress={handleStopRecording} />}
    </View>
  );
}

export default RecordingScreen;
