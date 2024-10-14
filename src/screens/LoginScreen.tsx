import React, { useState, useEffect } from 'react';
import { Linking, TouchableOpacity, Modal, Dimensions, View, Text, TouchableWithoutFeedback, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '../../assets/logo.png';
import Naver from '../../assets/naver.png';
import qs from 'qs';
import axios, {isCancel, AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { jwtDecode } from "jwt-decode";

type RootStackParamList = {
  Login: undefined;
  EmailLogin: undefined;
  OAuthResponse: { token: string };
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
    backgroundColor: 'white',
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

function LoginScreen({ navigation }: Props) {
  const [naverLoginVisible, setNaverLoginVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
      const checkTokenAndNavigate = async () => {
        try {
          // 토큰 확인
          const accessToken = await EncryptedStorage.getItem('accessToken');

          if (accessToken) {
            navigation.replace('TabNavigation');
          }
        } catch (error) {
          console.error('Error checking access token:', error);
        }
      };
      checkTokenAndNavigate();
    }, [navigation]);

  const handleNaverLogin = () => {
    setNaverLoginVisible(true);
  };

  const handleEmailLogin = () => {
    navigation.navigate('EmailLogin');
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log("Navigated to:", url);

    // 로그인 성공 시 리다이렉트
    if (url.startsWith('http://localhost:8080/login/oauth2/code/naver')) {
      const queryString = url.split('?')[1];
      const params = qs.parse(queryString);

      const code = params.code;
      const state = params.state;

      console.log('Authorization Code:', code);
      console.log('State:', state);

      postLoginCodeAndState(code, state);

      setNaverLoginVisible(false);
    }
  };

  //네이버 로그인 post 요청
  const postLoginCodeAndState = async (code: string, state: string) => {
    try {
      const data = {
        code: code,
        state: state
      };

      const response = await axios.post('http://192.168.45.77:8080/auth/oauth2', data);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        const email = parseEmailFromToken(accessToken);

        if (accessToken && email) {
          console.log('Access Token:', accessToken);
          console.log('email:', email);
        } else {
          setAlertVisible(true);
        }

        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('email', email);

        navigation.replace('TabNavigation')
      }

    } catch (error) {
      console.error('Error during POST request:', error);
      setAlertVisible(true);
    }
  };

  //토큰에서 이메일 파싱
  const parseEmailFromToken = (accessToken: string) => {
    try {

      const decoded: any = jwtDecode(accessToken);
      const email = decoded.username;

      return email;
    } catch (error) {
      console.error('Failed to parse email from token:', error);
      return null;
    }
  };

  return naverLoginVisible ? (
      <WebView source={{uri: 'http://192.168.45.77:8080/oauth2/authorization/naver'}}
        style={{flex: 1}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
  ) : (
    <SafeAreaView style={styles.container}>
        <View style={{height: 90}}/>
          <Image source={Logo} style={{ height: 150, width: 150 }} />
          <View style={styles.container}>
            <Text style={styles.logoText}>VoiceLog</Text>
            <View style={{ height: 150 }} />
            <TouchableWithoutFeedback onPress={handleNaverLogin}>
              <View>
                <Image source={Naver} style={styles.buttonImage} />
              </View>
            </TouchableWithoutFeedback>
            <View style={{ height: 20 }} />
            <TouchableWithoutFeedback onPress={handleEmailLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>이메일로 로그인</Text>
              </View>
            </TouchableWithoutFeedback>
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
                  <Text style={styles.alertTitle}>로그인 실패</Text>
                  <Text style={styles.alertMessage}>로그인에 실패하였습니다.</Text>
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

export default LoginScreen;
