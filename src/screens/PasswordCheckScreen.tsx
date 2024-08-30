import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, Alert, View, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
    PasswordCheck: undefined;
    PasswordReset: undefined;
    NewPassword: { email: string };
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
  }

});

function PasswordCheckScreen({ navigation }: Props) {
    const [email, setEmail] = useState('example@company.com');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const handleConfirm = () => {
        if (password == 'password123') {
            navigation.navigate('NewPassword', { email: email })
        } else {
            Alert.alert('비밀번호가 옳지 않습니다.');
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
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PasswordReset')}>
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
     </SafeAreaView>
  );
}


export default PasswordCheckScreen;