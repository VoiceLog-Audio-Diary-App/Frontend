import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import EmailLoginScreen from './screens/EmailLoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import CalendarScreen from './screens/CalendarScreen';
import RecordingScreen from './screens/RecordingScreen';
import SaveRecordingScreen from './screens/SaveRecordingScreen';
import ViewDiaryScreen from './screens/ViewDiaryScreen';
import EditDiaryScreen from './screens/EditDiaryScreen';
import TabNavigation from './navigations/Tab';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 네비게이션바 */}
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>

        {/* 로그인 관련 화면들 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

        {/* 캘린더 및 녹음 관련 화면들 */}
        {/* <Stack.Screen name="Calendar" component={CalendarScreen} /> */}
        <Stack.Screen name="Recording" component={RecordingScreen} />
        <Stack.Screen name="SaveRecording" component={SaveRecordingScreen} />
        <Stack.Screen name="ViewDiary" component={ViewDiaryScreen} />
        {/*<Stack.Screen name="EditDiary" component={EditDiaryScreen} />*/}

        {/* 마이페이지 */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
