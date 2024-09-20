import React from 'react';
import { View, TextInput, Button, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '../../assets/logo.png';
import Naver from '../../assets/naver.png';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
    color: '#252525',
    paddingHorizontal: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    color: 'black',
    fontWeight: '600',
  },
  buttonImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    color: 'black',
    borderRadius: 3,
    alignItems: 'center',
  },
  button: {
    width: 188,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '1000',
    color: 'white',
  },
});

function LoginScreen({ navigation }: Props) {
  const handleNaver = () => {
    console.log('네이버 로그인');
  };
  const handleEmail = () => {
    navigation.navigate('EmailLogin')
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{height: 90}}/>
        <Image source={Logo} style={{height: 150, width: 150}}/>
        <View style={styles.container}>
            <Text style={styles.logoText}>VoiceLog</Text>
            <View style={{height: 150}}/>
            <TouchableWithoutFeedback onPress={handleNaver}>
              <View>
                <Image source={Naver} style={styles.buttonImage}/>
              </View>
            </TouchableWithoutFeedback>
            <View style={{height: 20}}/>
            <TouchableWithoutFeedback onPress={handleEmail}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>이메일로 로그인</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
