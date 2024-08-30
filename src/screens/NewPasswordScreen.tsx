import React, { useState, useLayoutEffect, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeWhitespace, validatePassword } from "../util";

type RootStackParamList = {
  NewPassword: { email: string };
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
  }

});

function NewPasswordScreen({ route, navigation }: Props) {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { email } = route.params;
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);

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
    if (newPassword == confirmPassword && validatePassword(newPassword)) {
      Alert.alert(
        '비밀번호 재설정 완료',
        '새 비밀번호가 설정되었습니다. 다시 로그인해주세요.',
        [{ text: '확인', onPress: () => navigation.navigate('EmailLogin') }]
      );
    }
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
    </SafeAreaView>
  );
}

export default NewPasswordScreen;
