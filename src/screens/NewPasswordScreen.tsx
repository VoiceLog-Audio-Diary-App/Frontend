import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  NewPassword: { email: string };
  EmailLogin: undefined;
};

type NewPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewPassword'
>;

type NewPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'NewPassword'
>;

type Props = {
  navigation: NewPasswordScreenNavigationProp;
  route: NewPasswordScreenRouteProp;
};

function NewPasswordScreen({ route, navigation }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { email } = route.params;

  const handleNewPassword = () => {
    if (newPassword === confirmPassword) {
      Alert.alert(
        '비밀번호 재설정 완료',
        '새 비밀번호가 설정되었습니다. 이제 로그인하세요.',
        [{ text: '확인', onPress: () => navigation.navigate('EmailLogin') }]
      );
    } else {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="새 비밀번호"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="비밀번호 재설정" onPress={handleNewPassword} />
    </View>
  );
}

export default NewPasswordScreen;
