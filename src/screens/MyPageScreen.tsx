import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';


type RootStackParamList = {
    MyPage: undefined;
    PasswordCheck: undefined;
    Login: undefined;
};

type MyPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyPage'
>;

type Props = {
  navigation: MyPageScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 17,
    color: '#252525',
    paddingHorizontal: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  line: {
      height: 5,
      backgroundColor: '#E1E1E1',
      width: '100%',
      alignSelf: 'center',
  },
  thinLine: {
      height: 1,
      backgroundColor: '#E1E1E1',
      width: '100%',
      alignSelf: 'center',
  },
  button: {
      width: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 0,
      marginVertical: 0,
  },
  buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  leftText: {
      color: '#252525',
      fontSize: 17,
      fontWeight: '600',
  },
  rightText: {
      color: '#252525',
      fontSize: 17,
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalButton: {
      width: '100%',
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 20,
      marginVertical: 7,
      elevation: 5,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
    },
    modalPurchaseButton: {
        width: '100%',
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
        marginVertical: 7,
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
    confirmButton: {
      backgroundColor: 'black',
    },
    confirmButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },

});

function MyPageScreen({ navigation }: Props) {
    const [email, setEmail] = useState('example@company.com');
    const [coin, setCoin] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const purchase1 = () => {
        console.log("토큰 1개 구매");
    };
    const purchase5 = () => {
        console.log("토큰 5개 구매");
    };
    const purchase10 = () => {
        console.log("토큰 10개 구매");
    };
    const purchase30 = () => {
        console.log("토큰 30개 구매");
    };
    const contact = () => {
        const url = 'https://cheddar-drawbridge-dd8.notion.site/5239c3d00ae4405988798440fca6620b?pvs=4';
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    }

    const removeStoredData = async () => {
        try {
            await EncryptedStorage.removeItem('accessToken');
            await EncryptedStorage.removeItem('email');
        } catch (error) {
            console.error('Failed to remove stored data: ', error);
        }
    };

  return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.text}>{email}</Text>
       <View style={styles.line} />
       <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.button}>
             <View style={styles.buttonContent}>
                 <Text style={styles.leftText}>토큰</Text>
                 <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 20, color: 'black', textAlign: 'right' }}>{coin}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#252525" marginTop={5}/>
                </View>
             </View>
          </View>
       </TouchableWithoutFeedback>
       <View style={styles.line} />
       <TouchableWithoutFeedback onPress={contact}>
           <View style={styles.button}>
              <View style={styles.buttonContent}>
                  <Text style={styles.leftText}>문의하기</Text>
              </View>
           </View>
       </TouchableWithoutFeedback>
       <View style={styles.line} />
       <TouchableWithoutFeedback onPress={() => navigation.navigate('PasswordCheck')}>
          <View style={styles.button}>
             <View style={styles.buttonContent}>
                 <Text style={styles.leftText}>비밀번호 변경</Text>
             </View>
          </View>
       </TouchableWithoutFeedback>
       <View style={styles.thinLine} />
       <TouchableWithoutFeedback onPress={() => setLogoutAlertVisible(true)}>
         <View style={styles.button}>
            <View style={styles.buttonContent}>
                <Text style={styles.leftText}>로그아웃</Text>
            </View>
         </View>
     </TouchableWithoutFeedback>
     <View style={styles.thinLine} />
     <TouchableWithoutFeedback onPress={() => setDeleteAlertVisible(true)}>
       <View style={styles.button}>
          <View style={styles.buttonContent}>
              <Text style={styles.leftText}>회원탈퇴</Text>
          </View>
       </View>
     </TouchableWithoutFeedback>
     <View style={styles.line} />

      <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <View style={styles.modalContent}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginBottom: 20}}>추가 코인을 구매하세요</Text>
            <TouchableWithoutFeedback onPress={purchase1}>
                  <View style={styles.modalButton}>
                     <View style={styles.buttonContent}>
                         <Text style={{fontSize: 15, color: 'black'}}>토큰 1개</Text>
                         <Text style={{fontSize: 15, color: 'black'}}>500원</Text>
                     </View>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={purchase5}>
                <View style={styles.modalButton}>
                   <View style={styles.buttonContent}>
                       <Text style={{fontSize: 15, color: 'black'}}>토큰 5개</Text>
                       <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                           <Text style={{ fontSize: 11, color: '#939393', textAlign: 'right', textDecorationLine: 'line-through' }}>2,500 </Text>
                           <Text style={{ fontSize: 15, color: 'black', textAlign: 'right' }}>2,300원</Text>
                       </View>
                   </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={purchase10}>
                <View style={styles.modalButton}>
                   <View style={styles.buttonContent}>
                       <Text style={{fontSize: 15, color: 'black'}}>토큰 10개</Text>
                       <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                           <Text style={{ fontSize: 11, color: '#939393', textAlign: 'right', textDecorationLine: 'line-through' }}>5,000 </Text>
                           <Text style={{ fontSize: 15, color: 'black', textAlign: 'right' }}>4,500원</Text>
                       </View>
                   </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={purchase30}>
                <View style={styles.modalButton}>
                   <View style={styles.buttonContent}>
                       <Text style={{fontSize: 15, color: 'black'}}>토큰 30개</Text>
                       <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                           <Text style={{ fontSize: 11, color: '#939393', textAlign: 'right', textDecorationLine: 'line-through' }}>15,000 </Text>
                           <Text style={{ fontSize: 15, color: 'black', textAlign: 'right' }}>14,000원</Text>
                       </View>
                   </View>
                </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={true}
            visible={logoutAlertVisible}
            onRequestClose={() => setLogoutAlertVisible(false)}
            style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
          >
            <View style={styles.alertOverlay}>
              <View style={styles.alertContainer}>
                <Text style={styles.alertTitle}>로그아웃</Text>
                <Text style={styles.alertMessage}>로그아웃 하시겠어요?</Text>
                <View style={{height: 15}}/>
                <View style={styles.alertButtonContainer}>
                  <TouchableOpacity
                    style={[styles.alertButton, styles.cancelButton]}
                    onPress={() => setLogoutAlertVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>아니오</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.alertButton, styles.confirmButton]}
                    onPress={() => {
                      removeStoredData();
                      setLogoutAlertVisible(false);
                      navigation.replace('Login');
                    }}
                  >
                    <Text style={styles.confirmButtonText}>로그아웃</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
              animationType="slide"
              transparent={true}
              visible={deleteAlertVisible}
              onRequestClose={() => setDeleteAlertVisible(false)}
              style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }} // 전체 화면을 덮도록 설정
            >
              <View style={styles.alertOverlay}>
                <View style={styles.alertContainer}>
                  <Text style={styles.alertTitle}>회원탈퇴</Text>
                  <Text style={styles.alertMessage}>탈퇴하시면 복구가 불가능합니다.</Text>
                  <Text style={styles.alertMessage}>탈퇴하시겠어요?</Text>
                  <View style={{height: 15}}/>
                  <View style={styles.alertButtonContainer}>
                    <TouchableOpacity
                      style={[styles.alertButton, styles.cancelButton]}
                      onPress={() => setDeleteAlertVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>아니오</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.alertButton, styles.confirmButton]}
                      onPress={() => {
                        setDeleteAlertVisible(false);
                        navigation.navigate('Login');
                      }}
                    >
                      <Text style={styles.confirmButtonText}>탈퇴하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
     </SafeAreaView>
  );
}

export default MyPageScreen;
