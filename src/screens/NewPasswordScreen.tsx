import React, { useState, useLayoutEffect, useEffect } from 'react';
import { SafeAreaView, Modal, View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeWhitespace, validatePassword } from "../util";
import axios, {isCancel, AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { refreshAccessToken } from '../authService';

type RootStackParamList = {
  NewPassword: undefined;
  EmailLogin: undefined;
};

type NewPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NewPassword'
>;

type NewPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'NewPassword'
>;

type Props = {
  navigation: NewPasswordScreenNavigationProp;
  route: NewPasswordScreenRouteProp;
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

function NewPasswordScreen({ route, navigation }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordAlertVisible, setPasswordAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  //앱바
  useLayoutEffect(() => {
      navigation.setOptions({
          title: '비밀번호 재설정',
          headerTitleAlign: 'center',
          headerLeft: () => null,
          headerStyle: {
              backgroundColor: 'white',
              elevation: 5,
              shadowColor: 'black',
          }
      });
  }, [navigation]);

  const handleConfirm = () => {
    if (validatePassword(newPassword))
        passwordPatch(newPassword, confirmPassword);
  };

  const handleNewPasswordChange = (newPassword) => {
      const changedNewPassword = removeWhitespace(newPassword);
      setNewPassword(changedNewPassword);
      setErrorMessage(
        validatePassword(changedNewPassword) ? "" : "영문, 숫자, 특수기호 중 2가지 이상을 포함하여 8~15자로 입력해주세요."
      );
      setErrorMessage2(
        changedNewPassword === confirmPassword ? "" : "비밀번호가 같지 않습니다."
      );
  }

  const handleConfirmPasswordChange = (confirmPassword) => {
      const changedConfirmPassword = removeWhitespace(confirmPassword);
      setConfirmPassword(changedConfirmPassword);
      setErrorMessage2(
        newPassword === changedConfirmPassword ? "" : "비밀번호가 같지 않습니다."
      );
  }

  useEffect(() => {
      setIsDisabled(!(newPassword && confirmPassword && !errorMessage && !errorMessage2));
    }, [newPassword, confirmPassword, errorMessage, errorMessage2]);

    const passwordPatch = async (newPassword: string, checkNewPassword: string) => {
        try {
          const data = {
            newPassword: newPassword,
            checkNewPassword: checkNewPassword
          };
          const accessToken = await EncryptedStorage.getItem('accessToken');

          const response = await axios.patch('http://192.168.45.77:8080/mypage/password-patch', data,
          {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
          });

          if (response.status === 200) {
            await EncryptedStorage.removeItem('accessToken');
            await EncryptedStorage.removeItem('email');
            navigation.replace('EmailLogin');
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

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.text}>새로운 비밀번호를 입력해주세요.</Text>
    <View style={{height: 60}} />
    <View style={styles.container2}>
      <Text style={styles.inputInfoText}>비밀번호</Text>
          <View style={styles.inputWrapper}>
              <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={handleNewPasswordChange}
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
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <View style={{height: 20}} />
      <Text style={styles.inputInfoText}>비밀번호 재입력</Text>
          <View style={styles.inputWrapper}>
              <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder='비밀번호 재입력'
                  secureTextEntry={secureText2}
              />
              <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setSecureText2(!secureText2)}
              >
                  <Ionicons
                      name={secureText2 ? 'eye-off' : 'eye'}
                      size={20}
                      color='gray'
                  />
              </TouchableOpacity>
          </View>
          {errorMessage2 ? <Text style={styles.errorMessage}>{errorMessage2}</Text> : null}
          <View style={{height: 10}} />
          <Text style={styles.cautionText}>• 다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요.</Text>
          <Text style={styles.cautionText}>• 안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해주세요.</Text>
        <View style={{height: 70}} />
        <TouchableOpacity style={[styles.confirmButton, isDisabled && { backgroundColor: '#ccc' }]} onPress={handleConfirm} disabled={isDisabled}>
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
            <Text style={styles.alertTitle}>같은 비밀번호</Text>
            <Text style={styles.alertMessage}>현재 비밀번호와 같습니다.</Text>
            <Text style={styles.alertMessage}>새 비밀번호를 입력해주세요.</Text>
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
    </SafeAreaView>
  );
}

export default NewPasswordScreen;
