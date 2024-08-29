import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
    MyPage: undefined;
};

type CalendarScreenNavigationProp = StackNavigationProp<
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
    }

});

function MyPageScreen({ navigation }: Props) {
    const [email, setEmail] = useState('example@company.com');
    const [coin, setCoin] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
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
       <TouchableWithoutFeedback>
          <View style={styles.button}>
             <View style={styles.buttonContent}>
                 <Text style={styles.leftText}>비밀번호 변경</Text>
             </View>
          </View>
       </TouchableWithoutFeedback>
       <View style={styles.thinLine} />
       <TouchableWithoutFeedback>
         <View style={styles.button}>
            <View style={styles.buttonContent}>
                <Text style={styles.leftText}>로그아웃</Text>
            </View>
         </View>
     </TouchableWithoutFeedback>
     <View style={styles.thinLine} />
     <TouchableWithoutFeedback>
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
     </SafeAreaView>
  );
}

export default MyPageScreen;
