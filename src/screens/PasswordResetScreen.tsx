import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PasswordReset: undefined;
  NewPassword: { email: string };
};

type PasswordResetScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PasswordReset'
>;

type Props = {
  navigation: PasswordResetScreenNavigationProp;
};

function PasswordResetScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');

  const handlePasswordReset = () => {
    if (email === 'test@example.com') {
      Alert.alert(
        '비밀번호 재설정',
        '입력한 이메일로 임시 비밀번호를 보냈습니다.',
        [{ text: '확인', onPress: () => navigation.navigate('NewPassword', { email }) }]
      );
    } else {
      Alert.alert('오류', '등록되지 않은 이메일입니다.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="비밀번호 재설정" onPress={handlePasswordReset} />
    </View>
  );
}

export default PasswordResetScreen;
