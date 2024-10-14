import React, { useState, useLayoutEffect, useEffect } from 'react';
import { SafeAreaView, Modal, Text, Button, StyleSheet, Alert, View, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { refreshAccessToken } from '../authService';
import axios, {isCancel, AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

type RootStackParamList = {
    PasswordCheck: undefined;
    PasswordReset: undefined;
    NewPassword: undefined;
};

type PasswordCheckScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PasswordCheck'
>;

type Props = {
  navigation: PasswordCheckScreenNavigationProp;
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
    fontSize: 17,
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
  },
  inputWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: 15,
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
  textButton: {
      fontSize: 12,
      color: '#949494',
      textDecorationLine: 'underline',
  },
  confirmButton: {
      width: '100%',
      backgroundColor: 'black',
      alignItems: 'center',
      paddingVertical: 15,
      borderRadius: 5,
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
        color: '#252525',
        fontWeight: 'bold',
      },
    alertConfirmButton: {
        backgroundColor: '#252525',
      },
      alertConfirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },

});

function PasswordCheckScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [passwordAlertVisible, setPasswordAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [socialAlertVisible, setSocialAlertVisible] = useState(false);
    const [emailAlertVisible, setEmailAlertVisible] = useState(false);

    useEffect(() => {
      const loadEmail = async () => {
        try {

          const storedEmail = await EncryptedStorage.getItem('email');

          if (storedEmail) {
            setEmail(storedEmail);
          }
        } catch (error) {
          console.error('Error checking load email:', error);
        }
      };
      loadEmail();
    }, []);

    const handleConfirm = () => {
        socialCheck();
    };

    const socialCheck = async () => {
        try {

        const accessToken = await EncryptedStorage.getItem('accessToken');

          const response = await axios.get('http://192.168.45.77:8080/mypage/social-check',
          {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
          });

          if (response.status === 200) {
            await passwordCheck(password);
          }
        } catch (error) {
            //응답은 왔는데 오류 코드일 경우
          if (error.response) {
             if (error.response.status === 403) {
                 setSocialAlertVisible(true);
             } else if (error.response.status === 500) {
                 setErrorAlertVisible(true);
             } else if (error.response.status === 401) {
                 const refreshSuccess = await refreshAccessToken();
                 if (refreshSuccess)
                    await passwordCheck(oldPassword);
                 else
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

    const passwordCheck = async (oldPassword: string) => {
        try {
          const data = {
            oldPassword: password
          };

        const accessToken = await EncryptedStorage.getItem('accessToken');

          const response = await axios.post('http://192.168.45.77:8080/mypage/password-check', data,
          {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
          });

          if (response.status === 200) {
            navigation.navigate('NewPassword');
          }
        } catch (error) {
            //응답은 왔는데 오류 코드일 경우
          if (error.response) {
             if (error.response.status === 400) {
                 setPasswordAlertVisible(true);
             } else if (error.response.status === 500) {
                 setErrorAlertVisible(true);
             } else if (error.response.status === 401) {
                 const refreshSuccess = await refreshAccessToken();
                 if (refreshSuccess)
                    await passwordCheck(oldPassword);
                 else
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
          navigation.navigate('PasswordEmailVerification', { email: email });
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

    //앱바
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '비밀번호 확인',
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
        <Text style={styles.text}>회원님의 정보 보호를 위해,</Text>
        <Text style={styles.text}>현재 사용 중인 비밀번호를 확인해주세요.</Text>
        <View style={{height: 60}} />
        <View style={styles.container2}>
            <Text style={styles.inputInfoText}>이메일</Text>
            <TextInput
                style={styles.input}
                value={email}
                editable={false}
            />
            <View style={{height: 20}} />
            <Text style={styles.inputInfoText}>비밀번호</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='비밀번호'
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
            <TouchableWithoutFeedback onPress={() => setEmailAlertVisible(true)}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.textButton}>
                    비밀번호를 잊으셨나요?
                  </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{height: 70}} />
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>확인</Text>
            </TouchableOpacity>
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={passwordAlertVisible}
            onRequestClose={() => setPasswordAlertVisible(false)}
            style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
        >
            <View style={styles.alertOverlay}>
              <View style={styles.alertContainer}>
                <Text style={styles.alertTitle}>비밀번호 불일치</Text>
                <Text style={styles.alertMessage}>비밀번호가 옳지 않습니다.</Text>
                <View style={{height: 15}}/>
                <View style={styles.alertButtonContainer}>
                  <TouchableOpacity
                    style={[styles.alertButton, styles.cancelButton]}
                    onPress={() => setPasswordAlertVisible(false)}
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
            style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
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
              visible={socialAlertVisible}
              onRequestClose={() => setSocialAlertVisible(false)}
              style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
            >
              <View style={styles.alertOverlay}>
                <View style={styles.alertContainer}>
                  <Text style={styles.alertTitle}>소셜 로그인 회원</Text>
                  <Text style={styles.alertMessage}>소셜 로그인 회원은</Text>
                  <Text style={styles.alertMessage}>비밀번호 변경이 불가합니다.</Text>
                  <View style={{height: 15}}/>
                  <View style={styles.alertButtonContainer}>
                    <TouchableOpacity
                      style={[styles.alertButton, styles.cancelButton]}
                      onPress={() => setSocialAlertVisible(false)}
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
              visible={emailAlertVisible}
              onRequestClose={() => setEmailAlertVisible(false)}
              style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
            >
              <View style={styles.alertOverlay}>
                <View style={styles.alertContainer}>
                  <Text style={styles.alertTitle}>인증번호 전송</Text>
                  <Text style={styles.alertMessage}>가입하신 이메일로 인증번호를 보내드립니다.</Text>
                  <Text style={styles.alertMessage}>{email}</Text>
                  <View style={{height: 15}}/>
                  <View style={styles.alertButtonContainer}>
                    <TouchableOpacity
                      style={[styles.alertButton, styles.cancelButton]}
                      onPress={() => {
                          setEmailAlertVisible(false)
                      }}
                    >
                      <Text style={styles.cancelButtonText}>아니오</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.alertButton, styles.alertConfirmButton]}
                      onPress={() => {
                        setEmailAlertVisible(false);
                        sendEmail(email);
                      }}
                    >
                      <Text style={styles.alertConfirmButtonText}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
     </SafeAreaView>
  );
}


export default PasswordCheckScreen;