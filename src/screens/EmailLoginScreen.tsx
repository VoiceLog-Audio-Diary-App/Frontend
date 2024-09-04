import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert, Image, StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeWhitespace, validatePassword, validateEmail } from "../util";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/logo.png';
import Modal from 'react-native-modal';

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
  input: {
      height: 40,
      borderColor: 'black',
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      backgroundColor: "white",
      width: '100%',
      paddingRight: 35,
  },
  container2: {
      paddingHorizontal: 25,
      width: '100%',
      alignItems: 'flex-start',
  },
  inputWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: 5,
  },
  inputInfoText: {
      color: '#717171',
      fontSize: 16,
      fontWeight: '600',
      paddingBottom: 5,
  },
  icon: {
      position: 'absolute',
      right: 10,
      top: 10,
      height: 20,
      width: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  confirmButton: {
      width: '100%',
      backgroundColor: 'black',
      alignItems: 'center',
      paddingVertical: 15,
      borderRadius: 5,
  },
  cautionText: {
    color: '#949494',
    fontSize: 13,
  },
  errorMessage: {
      color: 'red',
      fontSize: 13,
      marginTop: 5,
  },
  textButton: {
    fontSize: 12,
    color: '#949494',
    textDecorationLine: 'underline',
  },
  textButton2: {
    fontSize: 12,
    color: '#949494',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  infoText: {
      color: '#949494',
      fontSize: 12
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    alertContainer: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
    },
    alertTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    alertMessage: {
      fontSize: 14,
      color: '#8E8E8E',
      textAlign: 'center',
      marginBottom: 5,
    },
    alertButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      alertButton: {
        flex: 1,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5,
      },
      cancelButton: {
        backgroundColor: '#F0F0F0',
      },
      cancelButtonText: {
        color: '#8E8E8E',
        fontWeight: 'bold',
      },

});

function EmailLoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [secureText, setSecureText] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginAlertVisible, setLoginAlertVisible] = useState(false);

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      navigation.navigate('TabNavigation')
    } else {
      setLoginAlertVisible(true);
    }
  };

  const handlePasswordChange = (password) => {
        const changedPassword = removeWhitespace(password);
        setPassword(changedPassword);
        setErrorMessage2(
          validatePassword(changedPassword) ? "" : "영문, 숫자, 특수기호 중 2가지 이상을 포함하여 8~15자로 입력해주세요."
        );
    }

  const handleEmailChange = (email) => {
      const changedEmail = removeWhitespace(email);
      setEmail(changedEmail);
      setErrorMessage(
        validateEmail(changedEmail) ? "" : "올바르지 않은 형식입니다."
      );
  }

   useEffect(() => {
     setIsDisabled(!(email && password && !errorMessage && !errorMessage2));
   }, [email, password, errorMessage, errorMessage2]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    <View style={{height: 70}}/>
      <Image source={Logo} style={{height: 135, width: 135}}/>
      <View style={styles.container2}>
        <View style={{height: 40}}/>
        <Text style={styles.inputInfoText}>이메일</Text>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={handleEmailChange}
                placeholder='example@company.com'
            />
        </View>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <View style={{height: 20}}/>
        <Text style={styles.inputInfoText}>비밀번호</Text>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder='비밀번호 입력'
                secureTextEntry={secureText}
            />
            <TouchableOpacity
                style={styles.icon}
                onPress={() => setSecureText(!secureText)}
            >
                <Ionicons
                    name={secureText ? 'eye-off' : 'eye'}
                    size={20}
                    color='gray'
                />
            </TouchableOpacity>
        </View>
        {errorMessage2 ? <Text style={styles.errorMessage}>{errorMessage2}</Text> : null}
        <View style={{height: 10}}/>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('PasswordReset')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.textButton}>
                비밀번호를 잊으셨나요?
              </Text>
            </View>
        </TouchableWithoutFeedback>
        <View style={{height: 25}}/>
        <TouchableOpacity style={[styles.confirmButton, isDisabled && { backgroundColor: '#ccc' }]} onPress={handleLogin} disabled={isDisabled}>
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 10}} />
      <View style={styles.textContainer}>
        <Text style={styles.infoText}>계정이 없으신가요?{' '}</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.textButton2}>
              회원가입
            </Text>
        </TouchableWithoutFeedback>
      </View>


      <Modal
          animationType="slide"
          transparent={true}
          visible={loginAlertVisible}
          onRequestClose={() => setLoginAlertVisible(false)}
          style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
        >
          <View style={styles.alertOverlay}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>존재하지 않는 회원</Text>
              <Text style={styles.alertMessage}>아이디 혹은 비밀번호를 확인해주세요.</Text>
              <View style={{height: 15}}/>
              <View style={styles.alertButtonContainer}>
                <TouchableOpacity
                  style={[styles.alertButton, styles.cancelButton]}
                  onPress={() => setLoginAlertVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default EmailLoginScreen;