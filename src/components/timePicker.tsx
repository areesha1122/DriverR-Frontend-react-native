import React, {FC, forwardRef} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
// import Modal from 'react-native-modal';
import {
  fontRef,
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import Button from './button';

interface IDatePickerModalProps {
  ref?: React.Ref<Modal>;
  onPress: (date: any) => void;
  onClosePress: () => void;
  showTimer: boolean;
  selectedDate?: any;
}

const TimePickerModal: FC<IDatePickerModalProps> = forwardRef<
  Modal,
  IDatePickerModalProps
>(({onPress, onClosePress, showTimer, selectedDate}, ref) => {
  const [hours, setHours]: any = React.useState(null);
  const [min, setMin]: any = React.useState(null);
  const [slot, setSlot]: any = React.useState(null);
  return (
    <Modal
      visible={showTimer}
      transparent={true}
      ref={ref}
      animationType="slide"
      onRequestClose={() => onClosePress()}>
      <View
        style={{
          backgroundColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 0.9 * fullWidth,
            height: 0.9 * fullWidth,
            marginTop: 0.3 * fullHeight,
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            contentContainerStyle={{
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setHours(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopColor: '#969696',
                    paddingBottom: 20,
                    borderRadius: 5,
                    width: 70,
                    marginTop: 10,
                    backgroundColor: item == hours ? 'pink' : '#D3D3d3d3',
                  }}>
                  <Text
                    language={language}
                    style={{fontSize: fontSizes.f39, marginTop: 20}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text
            style={{
              marginTop: 150 * heightRef,
              fontSize: fontSizes.f39,
              fontWeight: fontWeights.h500,
            }}>
            :
          </Text>
          <FlatList
            data={Array.from({length: 60}, (_, i) =>
              i.toString().padStart(2, '0'),
            )}
            contentContainerStyle={{
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setMin(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopColor: '#969696',
                    paddingBottom: 20,
                    borderRadius: 5,
                    width: 50,
                    marginTop: 10,
                    backgroundColor: item == min ? 'pink' : '#D3D3d3d3',
                  }}>
                  <Text
                    language={language}
                    style={{fontSize: fontSizes.f22, marginTop: 20}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text
            style={{
              marginTop: 150 * heightRef,
              fontSize: fontSizes.f39,
              fontWeight: fontWeights.h500,
            }}>
            :
          </Text>
          <FlatList
            data={['am', 'pm']}
            contentContainerStyle={{
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 350 * 0.3,
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => setSlot(item)}
                  style={{
                    justifyContent: 'center',
                    borderRadius: 5,
                    alignItems: 'center',
                    paddingBottom: 20,
                    paddingHorizontal: 15,
                    marginTop: 10,
                    backgroundColor: item == slot ? 'pink' : '#D3D3d3d3',
                  }}>
                  <Text
                    language={language}
                    style={{fontSize: fontSizes.f22, marginTop: 20}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            top: -15,
            width: 0.9 * fullWidth,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Button
            onPress={() => {
              if (hours && min && slot) {
                onClosePress();
              }
            }}
            buttonHeight={50}
            buttonText="Done"
          />
        </View>
      </View>
    </Modal>
  );
});

export default TimePickerModal;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22 * fontRef,
    fontWeight: '600',
    marginTop: 10,
  },
});
