import React, {FC, forwardRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {fontRef, heightRef} from 'src/config/screenSize';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {colors} from 'src/config/colors';
interface IDatePickerModalProps {
  ref?: React.Ref<Modal>;
  onPress: (date: any) => void;
  onClosePress: () => void;
  showCalendar: boolean;
  selectedDate?: any;
}

const DatePickerModal: FC<IDatePickerModalProps> = forwardRef<
  Modal,
  IDatePickerModalProps
>(({onPress, onClosePress, showCalendar, selectedDate}, ref) => {
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
          width: '100%',
        }}>
        <View>
          <Calendar
            initialDate={
              selectedDate
                ? moment(selectedDate).format('YYYY-MM-DD')
                : '2000-01-01'
            }
            minDate={'1970-01-01'}
            maxDate={'2002-04-7'}
            onDayPress={day => {
              onPress(day);
              onClosePress();
            }}
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
            markedDates={{
              [selectedDate
                ? moment(selectedDate).format('YYYY-MM-DD')
                : '2000-01-01']: {
                selected: true,
                selectedColor: colors.primary,
              },
            }}
          />
        </View>
      </View>
    </Modal>
  );
});

export default DatePickerModal;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22 * fontRef,
    fontWeight: '600',
    marginTop: 10,
  },
});
