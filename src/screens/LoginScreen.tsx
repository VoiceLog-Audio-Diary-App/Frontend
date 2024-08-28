import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  EmailLogin: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

function LoginScreen({ navigation }: Props) {
  return (
    <View>
      <Text>VoiceLog</Text>
      <Button
        title="이메일로 로그인"
        onPress={() => navigation.navigate('EmailLogin')}
      />
    </View>
  );
}

export default LoginScreen;
