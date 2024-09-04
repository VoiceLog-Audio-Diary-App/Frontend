import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert, Image, StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeWhitespace, validatePassword, validateEmail } from "../util";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/logo.png';
import Modal from 'react-native-modal';

type RootStackParamList = {
  PasswordReset: undefined;
  NewPassword: { email: string };
  EmailVerification: { email: string };
};

type PasswordResetScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PasswordReset'
>;

type Props = {
  navigation: PasswordResetScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 26,
    flexDirection: 'column',
    alignItems: 'flex-start',
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

function PasswordResetScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePasswordReset = () => {
    if (email === 'test@example.com') {
      navigation.navigate('EmailVerification', { email: email });
    } else {
      setAlertVisible(true);
    }
  };

  const handleEmailChange = (email) => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(
          validateEmail(changedEmail) ? "" : "올바르지 않은 형식입니다."
        );
    }

  useEffect(() => {
     setIsDisabled(!(email && !errorMessage));
  }, [email, errorMessage]);

  //앱바
  useLayoutEffect(() => {
      navigation.setOptions({
          title: '비밀번호 찾기',
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerStyle: {
              backgroundColor: 'white',
              elevation: 5,
              shadowColor: 'black',
          }
      });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    <View style={{height: 10}}/>
    <Text style={{fontSize: 14, color: '#252525', paddingLeft: 24}}>회원가입 시 기입했던 이메일을 입력해주세요.</Text>
    <Text style={{fontSize: 14, color: '#252525', paddingLeft: 24}}>이메일로 인증번호를 보내드립니다.</Text>
      <View style={styles.container2}>
        <View style={{height: 80}}/>
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
        <View style={{height: 35}}/>
        <TouchableOpacity style={[styles.confirmButton, isDisabled && { backgroundColor: '#ccc' }]} onPress={handlePasswordReset} disabled={isDisabled}>
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>비밀번호 재설정하기</Text>
        </TouchableOpacity>
      </View>


      <Modal
          animationType="slide"
          transparent={true}
          visible={alertVisible}
          onRequestClose={() => setAlertVisible(false)}
          style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
        >
          <View style={styles.alertOverlay}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>존재하지 않는 회원</Text>
              <Text style={styles.alertMessage}>이메일을 확인해주세요.</Text>
              <View style={{height: 15}}/>
              <View style={styles.alertButtonContainer}>
                <TouchableOpacity
                  style={[styles.alertButton, styles.cancelButton]}
                  onPress={() => setAlertVisible(false)}
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

export default PasswordResetScreen;
