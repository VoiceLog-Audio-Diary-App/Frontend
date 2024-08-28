import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  EmailVerification: { email: string };
  EmailLogin: undefined;
};

type EmailVerificationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EmailVerification'
>;

type EmailVerificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'EmailVerification'
>;

type Props = {
  navigation: EmailVerificationScreenNavigationProp;
  route: EmailVerificationScreenRouteProp;
};

function EmailVerificationScreen({ route, navigation }: Props) {
  const [code, setCode] = useState<string>('');
  const { email } = route.params;

  const handleVerify = () => {
    if (code === '111111') {
      Alert.alert('이메일 인증 성공');
      navigation.navigate('EmailLogin');
    } else {
      Alert.alert('인증 코드가 틀렸습니다.');
    }
  };

  return (
    <View>
      <Text>{email}로 코드를 보냈습니다.</Text>
      <TextInput
        placeholder="인증 코드 입력"
        value={code}
        onChangeText={setCode}
      />
      <Button title="확인" onPress={handleVerify} />
    </View>
  );
}

export default EmailVerificationScreen;
