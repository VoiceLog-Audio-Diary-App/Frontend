import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const EditDiaryScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDate } = route.params;

  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');

  useEffect(() => {
    // 선택된 날짜의 기존 일기 로드
    const loadDiaryEntry = async () => {
      try {
        const diaryEntry = await AsyncStorage.getItem(selectedDate);
        if (diaryEntry) {
          try {
            const parsedEntry = JSON.parse(diaryEntry); // JSON 파싱 시도
            setDiaryTitle(parsedEntry.title);
            setDiaryContent(parsedEntry.content);
          } catch (jsonError) {
            console.error('JSON Parse Error: ', jsonError);
            Alert.alert('Error', '저장된 데이터를 불러오는 중 오류가 발생했습니다.');
          }
        }
      } catch (error) {
        console.error('Error loading diary entry:', error);
      }
    };

    loadDiaryEntry();
  }, [selectedDate]);

  const handleSaveDiary = async () => {
    if (!diaryTitle || !diaryContent) {
      Alert.alert('Error', '제목과 내용을 모두 입력해 주세요.');
      return;
    }

    try {
      const diaryEntry = {
        title: diaryTitle,
        content: diaryContent,
      };
      await AsyncStorage.setItem(selectedDate, JSON.stringify(diaryEntry));
      Alert.alert('저장 완료', '일기가 수정되었습니다.');

      // 저장 후 ViewDiaryScreen으로 이동
      navigation.navigate('ViewDiary', { selectedDate });
    } catch (error) {
      Alert.alert('Error', '일기를 저장할 수 없습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 선택된 날짜 표시 */}
      <Text style={styles.dateText}>{moment(selectedDate).format('YYYY/MM/DD (ddd)')}</Text>

      {/* 일기 제목 입력 */}
      <TextInput
        style={styles.input}
        placeholder="일기 제목"
        value={diaryTitle}
        onChangeText={setDiaryTitle}
      />

      {/* 일기 내용 입력 */}
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="일기 내용"
        value={diaryContent}
        onChangeText={setDiaryContent}
        multiline
      />

      {/* 확인 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveDiary}>
        <Text style={styles.saveButtonText}>확인</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditDiaryScreen;
