import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ViewDiaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params;

  const [diaryTitle, setDiaryTitle] = useState(''); // 일기 제목
  const [diaryContent, setDiaryContent] = useState(''); // 일기 내용

  useEffect(() => {
    // 선택된 날짜에 맞는 일기 데이터를 가져오기 (가상의 데이터 로딩, 실제로는 AsyncStorage 또는 DB를 통해 가져옵니다)
    const loadDiaryEntry = async () => {
      try {
        // 예시: AsyncStorage에서 데이터 가져오기
        const entry = {
          title: '치킨 배달의 기대와 현실',
          content: '배고프다고 해서 결국 치킨을 시켰다. 황금 올리브 치킨을 먹었는데, 정말 맛있고 바삭하다. 배달이 부풀었지만, 사실 많이 먹지 못할 것 같다.',
        };

        setDiaryTitle(entry.title);
        setDiaryContent(entry.content);
      } catch (error) {
        Alert.alert('Error', '일기 내용을 불러올 수 없습니다.');
      }
    };

    loadDiaryEntry();
  }, [selectedDate]);

  // 오디오 재생 기능 (시작 및 정지)
  const handlePlayPause = async () => {
    // 오디오 플레이어 로직 추가 (예시로 재생/일시정지 기능을 구현합니다.)
    try {
      await audioRecorderPlayer.startPlayer();
    } catch (error) {
      Alert.alert('Error', '오디오를 재생할 수 없습니다.');
    }
  };

  // 수정하기 버튼 눌렀을 때 이동
  const handleEditDiary = () => {
    navigation.navigate('EditDiary', { selectedDate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{moment(selectedDate).format('YYYY/MM/DD (ddd)')}</Text>

      {/* 오디오 플레이어 부분 */}
      <View style={styles.audioPlayerContainer}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          <Text style={styles.playButtonText}>▶</Text>
        </TouchableOpacity>
        <View style={styles.playBar}></View>
        <TouchableOpacity style={styles.playButtonDisabled} disabled>
          <Text style={styles.playButtonTextDisabled}>재생성</Text>
        </TouchableOpacity>
      </View>

      {/* 일기 제목과 내용 */}
      <Text style={styles.diaryTitle}>제목 : {diaryTitle}</Text>
      <Text style={styles.diaryContent}>내용 : {diaryContent}</Text>

      {/* 수정하기 버튼 */}
      <TouchableOpacity onPress={handleEditDiary} style={styles.editButton}>
        <Text style={styles.editButtonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  audioPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  playButtonDisabled: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
  },
  playButtonTextDisabled: {
    color: '#AAA',
    fontSize: 14,
  },
  playBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#D3D3D3',
  },
  diaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  diaryContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFB74D',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ViewDiaryScreen;
