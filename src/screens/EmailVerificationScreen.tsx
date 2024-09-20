import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, TextInput, Modal, Button, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
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

  const handleVerify = () => {
      console.log(code);
    if (code.join('') === '111111') {
      Alert.alert('이메일 인증 성공');
      navigation.navigate('EmailLogin');
    } else {
      setAlertVisible(true);
    }
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
    </SafeAreaView>
  );
}

export default EmailVerificationScreen;
