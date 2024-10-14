import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, TextInput, Modal, Button, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import axios, {isCancel, AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

type RootStackParamList = {
    PasswordEmailVerification: { email: string };
    NewPassword: undefined;
};

type EmailVerificationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PasswordEmailVerification'
>;

type EmailVerificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PasswordEmailVerification'
>;

type Props = {
  navigation: PasswordEmailVerificationScreenNavigationProp;
  route: PasswordEmailVerificationScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#252525',
  },
  email: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 16,
    color: '#252525',
    marginBottom: 30,
    textAlign: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  codeInput: {
    width: 35,
    height: 50,
    borderBottomWidth: 5,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginHorizontal: 5,
  },
  emptyCodeInput: {
    borderColor: '#BCBCBC',
    color: '#BCBCBC',
  },
  filledCodeInput: {
    borderColor: 'black',
    color: 'black',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
      backgroundColor: '#252525',
    },
    cancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});

function EmailVerificationScreen({ route, navigation }: Props) {
  const [code, setCode] = useState(Array(6).fill(''));
  const { email } = route.params;
  const codeInputRefs = useRef<Array<any>>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [signUpAlertVisible, setSignUpAlertVisible] = useState(false);

  const handleVerify = () => {
    certificationCheck(email, code.join(''));
  };

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value.length === 1 && index < codeInputRefs.current.length - 1) {
      codeInputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0) {
        codeInputRefs.current[index - 1].focus();
      }
    }
  };

  const certificationCheck = async (email: string, certificationNumber: string) => {
      try {
        const data = {
          email: email,
          certificationNumber: certificationNumber
        };

        const response = await axios.post('http://192.168.45.77:8080/auth/certification-check', data);

        if (response.status === 200) {
          navigation.navigate('NewPassword');
        }

      } catch (error) {
          //응답은 왔는데 오류 코드일 경우
        if (error.response) {
           if (error.response.status == 401) {
               setAlertVisible(true);
           } else if (error.response.status == 500) {
               setErrorAlertVisible(true);
           } else {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log('Error Headers:', error.response.headers);
            setErrorAlertVisible(true);
           }
        } else {
           setErrorAlertVisible(true);
        }
      }
    };

  //앱바
  useLayoutEffect(() => {
      navigation.setOptions({
          title: '이메일 인증',
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.message}>코드를 보내 드렸습니다</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.subMessage}>인증을 위해 아래에 코드를 입력해주세요.</Text>
        <View style={{height: 20}}/>
        <View style={styles.codeInputContainer}>
          {Array(6).fill('').map((_, index) => (
            <TextInput
              key={index}
              ref={(el) => (codeInputRefs.current[index] = el)}
              style={[styles.codeInput, code[index] === '' ? styles.emptyCodeInput : styles.filledCodeInput,]}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={code[index]}
              textAlign="center"
            />
          ))}
        </View>
        <View style={{height: 70}}/>
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>인증번호 불일치</Text>
            <Text style={styles.alertMessage}>인증번호를 다시 확인해주세요.</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={errorAlertVisible}
        onRequestClose={() => setErrorAlertVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>오류</Text>
            <Text style={styles.alertMessage}>다시 시도해주세요.</Text>
            <View style={{height: 15}}/>
            <View style={styles.alertButtonContainer}>
              <TouchableOpacity
                style={[styles.alertButton, styles.cancelButton]}
                onPress={() => setErrorAlertVisible(false)}
              >
                <Text style={styles.cancelButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={signUpAlertVisible}
        onRequestClose={() => setSignUpAlertVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>이미 존재하는 회원</Text>
            <Text style={styles.alertMessage}>이미 사용 중인 이메일입니다.</Text>
            <View style={{height: 15}}/>
            <View style={styles.alertButtonContainer}>
              <TouchableOpacity
                style={[styles.alertButton, styles.cancelButton]}
                onPress={() => setSignUpAlertVisible(false)}
              >
                <Text style={styles.cancelButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default EmailVerificationScreen;
