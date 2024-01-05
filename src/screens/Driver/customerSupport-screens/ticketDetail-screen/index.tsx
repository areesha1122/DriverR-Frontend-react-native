import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {fontWeights} from 'src/config/fontWeight';
import {fontSizes} from 'src/config/fontSize';
import {getLanguage} from 'src/redux/auth/authSelector';

const TicketDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Selectors
  const language = useSelector(getLanguage);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            isButtonText={false}
            buttonHeight={32 * heightRef}
            buttonWidth={32 * heightRef}
            isIcon
            buttonColor={colors.grey100}
            iconSize={18 * heightRef}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.flex_start}
            iconName={'arrow-back-sharp'}
            iconType={'Ionicons'}
          />
          <Text
            style={{
              fontSize: fontSizes.f22,
              fontWeight: fontWeights.h600,
              color: colors.black,
              marginLeft: 10,
            }}>
            Customer support
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14 * fontRef,
            fontWeight: '400',
            color: '#969696',
            marginTop: 40 * heightRef,
          }}>
          {'Request categories'}
        </Text>
        <Text
          style={{
            fontSize: 20 * fontRef,
            fontWeight: '500',
            color: '#494949',
            marginTop: 5 * heightRef,
          }}>
          {route.params.data.subject}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20 * heightRef,
          }}>
          <Image
            source={Images.time2}
            style={{
              width: 15 * heightRef,
              height: 15 * heightRef,
              marginRight: 5 * widthRef,
            }}
          />
          <Text
            style={{
              fontSize: 12 * fontRef,
              fontWeight: '400',
              color: '#969696',
            }}>
            {moment(route.params.data.createdAt).format('MMMM Do YYYY, h:mm a')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 14 * fontRef,
            fontWeight: '400',
            color: '#6B7280',
            marginTop: 20 * heightRef,
          }}>
          {route.params.data.description}
        </Text>
        <View
          style={{
            position: 'absolute',
            bottom: DeviceInfo.hasNotch() ? 0 : 30 * heightRef,
            width: '100%',
          }}>
          {route.params.data.status == 'IN_PROGRESS' ? (
            <Button
              onPress={() => {
                navigation.navigate('TicketChatScreen', {
                  id: route.params.data._id,
                });
              }}
              buttonText={'Chat'}
              buttonHeight={40 * heightRef}
              buttonWidth={0.9 * fullWidth}
              buttonColor={colors.primary}
              iconSize={25}
              // isLoading={loader}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.center}
              titleFontStyle={fontWeights.h500}
              buttonstyle={{}}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    width: '100%',
  },
  container: {
    flex: 9,
    width: '90%',
    marginTop: 10 * heightRef,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 13 * fontRef,
    fontWeight: '500',
  },
});

export default TicketDetailScreen;
