import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params;

  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // 선택된 날짜 확인
    if (!selectedDate) {
      Alert.alert('Error', '선택된 날짜 정보가 없습니다.');
    }
  }, [selectedDate]);

  // 녹음 시작
  const handleStartRecording = async () => {
    setIsRecording(true);
    try {
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
        return;
      });
    } catch (error) {
      Alert.alert('Error', '녹음을 시작할 수 없습니다.');
      setIsRecording(false);
    }
  };

  // 녹음 중지
  const handleStopRecording = async () => {
    setIsRecording(false);
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsModalVisible(true); // 녹음 종료 시 모달 표시
    } catch (error) {
      Alert.alert('Error', '녹음을 종료할 수 없습니다.');
    }
  };

  // 일기 작성 종료 확인
  const handleSaveRecording = async () => {
    setIsModalVisible(false);
    // 일기를 저장하고 다른 화면으로 이동하는 로직 추가 (예: CalendarScreen으로 돌아가기)
    Alert.alert('녹음 완료', '녹음이 저장되었습니다.');
    navigation.navigate('Calendar'); // 캘린더로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{selectedDate}</Text>

      {/* 녹음 버튼 */}
      <View style={styles.recordingContainer}>
        <TouchableOpacity
          style={[styles.recordButton, { backgroundColor: isRecording ? '#FF0000' : '#00AAFF' }]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Text style={styles.recordButtonText}>{isRecording ? '녹음 중지' : '녹음 시작'}</Text>
        </TouchableOpacity>
        <Text style={styles.timerText}>{recordTime}</Text>
      </View>

      {/* 녹음 종료 후 알림창 */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>일기 작성을 종료하시겠어요?</Text>
            <Text style={styles.modalDescription}>
              종료 시 AI가 일기를 작성해주며 토큰이 차감됩니다.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonTextCancel}>아니요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={handleSaveRecording}
              >
                <Text style={styles.modalButtonTextConfirm}>종료하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  recordButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginRight: 10,
  },
  modalButtonTextCancel: {
    color: '#888888',
    fontSize: 16,
  },
  modalButtonConfirm: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonTextConfirm: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default RecordingScreen;
