import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MyPage: undefined;
};

type CalendarScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyPage'
>;

type Props = {
  navigation: CalendarScreenNavigationProp;
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
    fontSize: 20,
    color: '#252525',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  line: {
      height: 5,
      backgroundColor: '#E1E1E1',
      marginVertical: 15,
      width: '100%',
      alignSelf: 'center',
  },
  thinLine: {
      height: 1,
      backgroundColor: '#E1E1E1',
      marginVertical: 15,
      width: '100%',
      alignSelf: 'center',
  }
});

function MyPageScreen({ navigation }: Props) {

  return (
     <SafeAreaView style={styles.container}>
       <Text style={styles.text}>이메일</Text>
       <View style={styles.line} />
     </SafeAreaView>
  );
}

export default MyPageScreen;
