import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Modal, TextInput, Button, ScrollView, TouchableOpacity, Keyboard, KeyboardAvoidingView, Alert, Image, StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeWhitespace, validatePassword, validateEmail } from "../util";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/logo.png';
import axios, {isCancel, AxiosError} from 'axios';

type RootStackParamList = {
  SignUp: undefined;
  EmailVerification: { email: string, password: string };
  EmailLogin: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
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
  scrollView: {
     flexGrow: 1,
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

function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [secureText, setSecureText] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [signUpAlertVisible, setSignUpAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  //앱바
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '회원가입',
            headerTitleAlign: 'center',
            headerLeft: () => null,
            headerStyle: {
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: 'black',
            }
        });
    }, [navigation]);

  const handleSignUp = () => {
    emailCheck(email);
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

   const emailCheck = async (email: string) => {
       try {
         const data = {
           email: email,
         };

         const response = await axios.post('http://192.168.45.77:8080/auth/email-check', data);

         if (response.status === 200) {
           sendEmail(email);
         }

       } catch (error) {
           //응답은 왔는데 오류 코드일 경우
         if (error.response) {
            if (error.response.status == 400) {
                setSignUpAlertVisible(true);
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

   const sendEmail = async (email: string) => {
        try {
          const data = {
            email: email
          };

          const response = await axios.post('http://192.168.45.77:8080/auth/email-certification', data);

          if (response.status === 200) {
            navigation.navigate('EmailVerification', { email: email, password: password });
          }

        } catch (error) {
            //응답은 왔는데 오류 코드일 경우
          if (error.response) {
             setErrorAlertVisible(true);
          } else {
             setErrorAlertVisible(true);
          }
        }
      };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>

    <View style={{height: 40}}/>
      <Image source={Logo} style={{height: 135, width: 135}}/>
      <View style={styles.container2} keyboardVerticalOffset= {20}>
        <View style={{height: 50}}/>
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
        <View style={{height: 25}}/>
        <TouchableOpacity style={[styles.confirmButton, isDisabled && { backgroundColor: '#ccc' }]} onPress={handleSignUp} disabled={isDisabled}>
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 10}} />
      <View style={styles.textContainer}>
        <Text style={styles.infoText}>이미 계정이 있으신가요?{' '}</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('EmailLogin')}>
            <Text style={styles.textButton2}>
              로그인
            </Text>
        </TouchableWithoutFeedback>
      </View>

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
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;