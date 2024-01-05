import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text as text2,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {
  fontRef,
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fontWeights} from 'src/config/fontWeight';
import {fontSizes} from 'src/config/fontSize';
import {getAllDrivers} from 'src/redux/jobPosts/jobPostsSelector';
import moment from 'moment';
import {
  addMsgToTicket,
  getSpecificTicketMsgs,
} from 'src/redux/support-faqs/supportApiCalls';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import Text from 'src/components/text';

const TicketChatScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();

  // States
  const [message, setMessage] = useState('');
  const [data, setData]: any = useState([]);
  const [count, setCount]: any = useState(0);

  // Selectors
  const language = useSelector(getLanguage);
  const drivers = useSelector(getAllDrivers);
  const profile = useSelector(getProfile);

  // Effects
  useEffect(() => {
    dispatch(
      getSpecificTicketMsgs(route.params.id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          setData(msg.reverse());
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, [count]);

  // Functions
  const renderMessages = () => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        style={{width: '98%', height: '100%'}}
        inverted
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 14 * fontRef,
              alignSelf: 'center',
              textDecorationLine: 'underline',
              color: '#C0C0C0',
              marginBottom: 5 * heightRef,
            }}>
            We will give you response in 24 hours
          </Text>
        }
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: fullHeight * 0.7,
            }}></View>
        )}
        renderItem={({item, index}) => (
          <View
            key={item}
            style={{
              margin: 10 * heightRef,
              alignSelf: item.sender != profile._id ? 'flex-start' : 'flex-end',
              alignItems:
                item.sender != profile._id ? 'flex-start' : 'flex-end',
            }}>
            <View
              style={{
                borderRadius: 20 * heightRef,
                backgroundColor:
                  item.sender != profile._id ? '#E4E4E4' : '#D0ECE8',
                borderBottomRightRadius:
                  item.sender != profile._id ? 20 * heightRef : 0 * heightRef,
                borderBottomLeftRadius:
                  item.sender != profile._id ? 0 * heightRef : 20 * heightRef,
              }}>
              <Text
                style={{
                  color: item.sender != profile._id ? '#383737' : '#007665',
                  padding: 14,
                  fontSize: 14 * fontRef,
                  maxWidth: 270 * widthRef,

                  //   width: item.attachment ? 270 * widthRef : null,
                }}>
                {item.text}
              </Text>
            </View>
            {/* {item.attachment ? (
                    <Image
                      style={{
                        height: 150 * heightRef,
                        width: 270 * widthRef,
                        backgroundColor:
                          item.type != 'self' ? '#FBFBFB' : '#D7EEFF',
                      }}
                      resizeMode={'cover'}
                      source={{uri: item.attachment}}
                    />
                  ) : null} */}
            <Text
              style={{
                color: '#d3d3d3d3',
                fontSize: 12 * fontRef,
                marginTop: 4 * heightRef,
              }}>
              {moment(item.createdAt).format('h:mm a')}
            </Text>
          </View>
        )}
      />
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
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
          buttonstyle={{marginTop: 3}}
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Text
          language={language}
          style={{
            fontSize: fontSizes.f22,
            fontWeight: fontWeights.h600,
            color: colors.black,
            marginLeft: 10,
          }}>
          Customer support
        </Text>
      </View>

      <View
        style={{
          height: 22 * heightRef,
          width: 100 * widthRef,
          backgroundColor: '#F2F2F2',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 10 * heightRef,
          marginBottom: 5 * heightRef,
        }}>
        <Text
          language={language}
          style={{fontSize: 11 * fontRef, color: 'gray'}}>
          View Request
        </Text>
      </View>

      {renderMessages()}
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          marginVertical: 10,
          marginBottom:
            Platform.OS == 'android' ? 50 * heightRef : 30 * heightRef,
          flexDirection: 'row',
          alignSelf: 'center',
          paddingBottom: 10 * heightRef,
        }}>
        <TextInput
          placeholder="Enter your message"
          placeholderTextColor={'#9CA3AF'}
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 0.9,
            color: colors.grey250,
            backgroundColor: '#F7F7F7',
            position: 'absolute',
            left: 20 * widthRef,
            // top: Platform.OS == 'ios' ? 5 : -10,
            width: '80%',
            padding: 13 * heightRef,
            borderRadius: 30 * heightRef,
            height: 50 * heightRef,
            marginBottom: 10 * heightRef,
          }}
        />
        <Icon
          onPress={() => {}}
          name={'attachment'}
          type={IconType.Entypo}
          size={18 * heightRef}
          color={colors.grey300}
          style={{
            position: 'absolute',
            right: 0.18 * fullWidth,
            top: 17 * heightRef,
            zIndex: 1,
          }}
        />

        <Icon
          onPress={() => {
            message == ''
              ? null
              : dispatch(
                  addMsgToTicket(
                    {
                      queryId: route.params.id,
                      message: message,
                      adminReply: false,
                    },

                    (success, msg) => {
                      if (success) {
                        console.log('41: Success');
                        setCount(count + 1);
                        setMessage('');
                        Keyboard.dismiss();
                      } else {
                        console.log('Image', msg);
                      }
                      return true;
                    },
                  ),
                );
          }}
          name={'send'}
          type={IconType.Feather}
          size={22 * heightRef}
          color={colors.primary}
          style={{
            position: 'absolute',
            right: 15 * widthRef,
            top: 12 * heightRef,
            zIndex: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TicketChatScreen;
