import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const CalendarScreen: React.FC = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [diaryTitle, setDiaryTitle] = useState(''); // 제목 표시용 상태
  const [selectedDateClickCount, setSelectedDateaClickCount] = useState(0);
  const navigation = useNavigation();

  // 저장된 일기 데이터를 로드하여 markedDates로 설정
  useEffect(() => {
    const loadMarkedDates = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const datesWithDiary = {};

      for (let key of allKeys) {
        const diaryEntry = await AsyncStorage.getItem(key);
        if (diaryEntry) {
          datesWithDiary[key] = {
            marked: true,
            customStyles: {
              container: {
                backgroundColor: '#FFE4B5',
              },
              text: {
                color: 'black',
              },
            },
            icon: '✏️',
          };
        }
      }
      setMarkedDates(datesWithDiary);
    };

    loadMarkedDates();
  }, []);

  const handleDatePress = async (day: any) => {
    const clickedDate = day.dateString;

    // 클릭 횟수 확인 및 관리
    if (clickedDate === selectedDate) {
      setSelectedDateClickCount((prevCount) => prevCount + 1);
    } else {
      setSelectedDateClickCount(1);
    }

    setSelectedDate(clickedDate);

    // 한 번 클릭했을 때 제목을 하단에 표시
    try {
      const diaryEntry = await AsyncStorage.getItem(clickedDate);
      if (diaryEntry) {
        // 여기서 제목을 하드코딩하여 설정합니다
        setDiaryTitle('치킨 배달의 기대와 현실'); // 고정된 제목을 설정
      } else {
        setDiaryTitle(''); // 일기가 없는 경우 제목 초기화
      }
    } catch (error) {
      console.error('Error loading diary entry:', error);
    }

    // 두 번 클릭했을 때 `ViewDiaryScreen`으로 이동
    if (selectedDateClickCount >= 1) {
      setSelectedDateClickCount(0);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Diary',
              params: { selectedDate: clickedDate },
            },
          ],
        })
      );
    }
  };

  const handleDiaryNavigation = () => {
    // 선택한 날짜로 녹음 화면으로 이동
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Diary',
            params: { selectedDate: selectedDate },
          },
        ],
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
        markingType={'custom'}
        onDayPress={(day) => {
          handleDatePress(day);
        }}
        renderArrow={(direction) => (
          <Text style={styles.arrow}>{direction === 'left' ? '←' : '→'}</Text>
        )}
        dayComponent={({ date, state }) => {
          const isMarked = markedDates[date.dateString];
          return (
            <TouchableOpacity
              onPress={() => handleDatePress({ dateString: date.dateString })}
              onLongPress={() => handleDiaryNavigation()}
            >
              <View style={styles.dayContainer}>
                <Text style={{ color: state === 'disabled' ? 'gray' : 'black' }}>
                  {date.day}
                </Text>
                {isMarked && (
                  <Text style={styles.markIcon}>✏️</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* 선택된 날짜의 일기 제목을 아래에 표시 */}
      {selectedDate && diaryTitle ? (
        <View style={styles.diaryContentContainer}>
          <Text style={styles.diaryTitle}>{`${selectedDate}의 일기 제목:`}</Text>
          <Text style={styles.diaryTitleContent}>{diaryTitle}</Text>
        </View>
      ) : selectedDate ? (
        <View style={styles.diaryContentContainer}>
          <Text style={styles.noDiaryText}>선택된 날짜에 저장된 일기가 없습니다.</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    fontSize: 18,
    padding: 10,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markIcon: {
    fontSize: 14,
    color: 'blue',
    marginTop: 2,
  },
  diaryContentContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  diaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diaryTitleContent: {
    fontSize: 14,
    color: '#333',
  },
  noDiaryText: {
    fontSize: 14,
    color: '#888888',
  },
});

export default CalendarScreen;
