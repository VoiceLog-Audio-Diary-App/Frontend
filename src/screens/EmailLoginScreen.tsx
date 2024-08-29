import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  EmailLogin: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
};

type EmailLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EmailLogin'
>;

type Props = {
  navigation: EmailLoginScreenNavigationProp;
};

function EmailLoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      Alert.alert('로그인 성공');
      navigation.navigate('TabNavigation')
    } else {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts >= 2) {
        Alert.alert(
          '비밀번호를 잊으셨나요?',
          '비밀번호를 재설정하시겠습니까?',
          [
            { text: '아니오', onPress: () => console.log('취소됨') },
            { text: '예', onPress: () => navigation.navigate('PasswordReset') },
          ]
        );
      } else {
        Alert.alert('로그인 실패', '존재하지 않는 회원입니다.');
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

export default EmailLoginScreen;
