import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SignUp: undefined;
  EmailVerification: { email: string };
};

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conditions, setConditions] = useState({
    hasNumber: false,
    hasLetter: false,
    isLongEnough: false,
  });

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setConditions({
      hasNumber: /\d/.test(text),
      hasLetter: /[a-zA-Z]/.test(text),
      isLongEnough: text.length >= 8,
    });
  };

  const handleSignUp = () => {
    if (Object.values(conditions).every(Boolean)) {
      navigation.navigate('EmailVerification', { email });
    } else {
      Alert.alert('회원가입 실패', '비밀번호 조건을 확인해주세요.');
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
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <Text>영문 포함: {conditions.hasLetter ? '✅' : '❌'}</Text>
      <Text>숫자 포함: {conditions.hasNumber ? '✅' : '❌'}</Text>
      <Text>8자 이상: {conditions.isLongEnough ? '✅' : '❌'}</Text>
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  );
}

export default SignUpScreen;
