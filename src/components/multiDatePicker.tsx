import React, {FC, forwardRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {fontRef, heightRef} from 'src/config/screenSize';
import {Calendar} from 'react-native-calendars';
interface IDatePickerModalProps {
  ref?: React.Ref<Modal>;
  onPress: (date: any) => void;
  onClosePress: () => void;
  showCalendar: boolean;
  selectedDate?: any;
}

const MultiDatePickerModal: FC<IDatePickerModalProps> = forwardRef<
  Modal,
  IDatePickerModalProps
>(({onPress, onClosePress, showCalendar, selectedDate}, ref) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onDayPress = (day: any) => {
    if (!startDate) {
      // select start date
      setStartDate(day.dateString);
    } else if (!endDate) {
      // select end date
      if (new Date(day.dateString) >= new Date(startDate)) {
        setEndDate(day.dateString);
      } else {
        setStartDate(day.dateString);
        setEndDate('');
      }
    } else {
      // reset selection
      setStartDate(day.dateString);
      setEndDate('');
    }
  };

  const markedDates: any = {};
  if (startDate && endDate) {
    let date = new Date(startDate);
    while (date <= new Date(endDate)) {
      const dateString = date.toISOString().split('T')[0];
      markedDates[dateString] = {
        startingDay: date.getTime() === new Date(startDate).getTime(),
        endingDay: date.getTime() === new Date(endDate).getTime(),
        color: '#008dff',
      };
      date.setDate(date.getDate() + 1);
    }
  } else if (startDate) {
    markedDates[startDate] = {color: '#008dff'};
  }

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={showCalendar}
      ref={ref}
      onBackdropPress={() => onClosePress()}
      onSwipeComplete={() => onClosePress()}
      swipeDirection={['down']}
      style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
        }}>
        <View>
          <Calendar
            initialDate={'2023-03-01'}
            minDate={'2010-05-10'}
            markingType={'period'}
            onDayPress={onDayPress}
            markedDates={markedDates}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            hideArrows={false}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
        </View>
      </View>
    </Modal>
  );
});

export default MultiDatePickerModal;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22 * fontRef,
    fontWeight: '600',
    marginTop: 10,
  },
});
