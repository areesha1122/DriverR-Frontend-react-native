import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text as Text2,
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
import Modal from 'react-native-modal';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import {sockett} from 'src/components/socket';
import Text from 'src/components/text';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import {
  chatBlockUnblock,
  getChat,
  getMessagesList,
  markChatAsRead,
} from 'src/redux/chat/chatApiCalls';
import {uploadPicToServer} from 'src/redux/auth/authApiCalls';

const CompanyChatScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();

  // States
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(route.params.data);
  const [file, setFile]: any = useState({});
  const [chatMessages, setChatMessages]: any = useState(chat.messages || []);
  const [showOption, setShowOption] = useState(false);
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    console.log('UseEffect');
    socketCall();

    const socketLeave = () => {
      sockett.emit('leave-room', {
        sender: profile._id,
        receiver: route.params.data.driver._id,
      });
    };

    const updateMsgs = () => {
      dispatch(
        getMessagesList(profile._id, (success, msg) => {
          if (success) {
            console.log('update Msgs');
          } else {
          }
          return true;
        }),
      );
    };
    return () => {
      socketLeave(), updateMsgs();
    };
  }, []);

  useEffect(() => {
    dispatch(
      getChat(route.params.data._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          setChat(msg);
          setChatMessages(msg.messages.reverse());
        } else {
        }
        return true;
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      markChatAsRead(
        route.params.data._id,
        route.params.data.driver._id,
        (success, msg) => {
          if (success) {
            console.log('41: Success');
          } else {
          }
          return true;
        },
      ),
    );
  }, []);

  // Functions
  const launchImageLibrary = async () => {
    let response = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
    });
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log(response.errorMessage);
    } else if (response.assets) {
      console.log(response.assets);

      setFile({
        name: response.assets[0]?.fileName,
        uri: response.assets[0]?.uri,
        type: response.assets[0]?.type,
      });

      // const isLicense = await checkIfLicense(response.assets[0]?.uri);
    } else if (response.errorCode) {
      console.log(response.errorCode);
    }
  };

  // const pickFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     // Log the picked file details
  //     console.log('File ---->', res);

  //     setFile(res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker
  //       console.log('File picking cancelled.');
  //     } else {
  //       // Error occurred while picking the file
  //       console.log('Error picking file:', err);
  //     }
  //   }
  // };

  const socketCall = async () => {
    console.log('--->', sockett);

    sockett.on('driver-company-chat', (data: any) => {
      // Handle the received data
      console.log('message from backend company', data);

      setMessage('');
      if (
        !chatMessages.includes({
          _id: data.id,
          sender:
            data.sendBy == 'company'
              ? profile._id
              : route.params.data.driver._id,
          message: data.message,
          createdAt: new Date(),
        })
      ) {
        setChatMessages((chatMessages: any) => [
          {
            _id: data.id,
            sender:
              data.sendBy == 'company'
                ? profile._id
                : route.params.data.driver._id,
            message: data.message,
            attachment: data.attachment,
            createdAt: new Date(),
          },
          ...chatMessages,
        ]);
      }
    });

    sockett.emit('join-room', {
      sender: profile._id,
      receiver: route.params.data.driver._id,
    });
  };

  const renderMessages = () => {
    return (
      <FlatList
        data={chatMessages}
        showsVerticalScrollIndicator={false}
        style={{width: '98%', height: '100%'}}
        inverted
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
                language={language}
                style={{
                  color: item.sender != profile._id ? '#383737' : '#007665',
                  padding: 14,
                  fontSize: 14 * fontRef,
                  maxWidth: 270 * widthRef,

                  //   width: item.attachment ? 270 * widthRef : null,
                }}>
                {item.message}
              </Text>
              {item.attachment ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewImgScreen', {
                      data: item.attachment,
                    })
                  }>
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
                </TouchableOpacity>
              ) : null}
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
            <Text2
              style={{
                color: '#d3d3d3d3',
                fontSize: 12 * fontRef,
                marginTop: 4 * heightRef,
              }}>
              {moment(item.createdAt).format('h:mm a')}
            </Text2>
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
            dispatch(
              getMessagesList(profile._id, (success, msg) => {
                if (success) {
                  console.log('41: Success');
                  navigation.goBack();
                } else {
                }
                return true;
              }),
            );
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={styles.image3}
            resizeMode="cover"
            source={{uri: route.params.data.driver.profilePicture}}
          />
          <View style={{marginLeft: 10 * widthRef}}>
            <Text language={language} style={styles.text6}>
              {route.params.data.driver.firstName +
                ' ' +
                route.params.data.driver.lastName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                language={language}
                style={[
                  styles.text5,
                  {
                    color:
                      chat.status == 'BLOCKED' ? colors.error : colors.success,
                  },
                ]}>
                {chat.status == 'BLOCKED' ? 'Blocked' : 'Active'}
              </Text>
              {/* <View
                style={{
                  height: 8 * heightRef,
                  width: 8 * heightRef,
                  borderRadius: 10 * heightRef,
                  backgroundColor: '#55A99D',
                  marginTop: 6 * heightRef,
                  marginLeft: 5 * widthRef,
                }}
              /> */}
            </View>
          </View>
        </View>

        <View style={[styles.input2]}>
          {chat.status == 'BLOCKED' && chat.blockedBy != profile._id ? null : (
            <Icon
              onPress={() => {
                setShowOption(true);
              }}
              name={'dots-three-vertical'}
              type={IconType.Entypo}
              size={20 * heightRef}
              color={colors.black}
              style={{
                position: 'absolute',
                right: 20 * widthRef,
                bottom: Platform.OS == 'ios' ? 12 * heightRef : 17 * heightRef,
                zIndex: 1,
              }}
            />
          )}
          {/* <Icon
            onPress={() => {}}
            name={'ios-call-outline'}
            type={IconType.Ionicons}
            size={22 * heightRef}
            color={colors.black}
            style={{
              position: 'absolute',
              right: 50 * widthRef,
              bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
              zIndex: 1,
            }}
          /> */}
        </View>
      </View>

      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#E4E4E4',
          marginTop: 10,
        }}
      />

      {renderMessages()}
      {chat.status == 'BLOCKED' ? (
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            marginVertical: 5,
            marginBottom: 0 * heightRef,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text>You cannot message to this chat</Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            marginVertical: 10,
            marginBottom:
              Platform.OS == 'ios' ? 30 * heightRef : 60 * heightRef,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          {file?.uri ? (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 10 * heightRef,
                zIndex: 1,
              }}>
              <TouchableOpacity
                onPress={() => setFile({})}
                style={{
                  height: 15 * heightRef,
                  width: 15 * heightRef,
                  position: 'absolute',
                  backgroundColor: 'red',
                  borderRadius: 20 * heightRef,
                  right: -5,
                }}>
                <Icon
                  name={'cross'}
                  type={IconType.Entypo}
                  size={15}
                  color={colors.white}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>

              <Image
                style={{
                  height: 32 * heightRef,
                  width: 32 * widthRef,
                  marginLeft: 15 * widthRef,
                  borderRadius: 25 * heightRef,
                  zIndex: -100,
                }}
                resizeMode="cover"
                // source={Images.logo2}
                source={file}
              />
            </View>
          ) : null}
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
              top: Platform.OS == 'ios' ? 5 : -10,
              width: '80%',

              padding: 13 * heightRef,
              paddingLeft: file?.uri ? 37 * widthRef : 13 * heightRef,
              borderRadius: 30 * heightRef,
            }}
          />
          {file?.uri ? null : (
            <Icon
              onPress={() => {
                launchImageLibrary();
              }}
              name={'attachment'}
              type={IconType.Entypo}
              size={18 * heightRef}
              color={file?.uri != undefined ? colors.success : colors.grey300}
              style={{
                position: 'absolute',
                right: 0.18 * fullWidth,
                top: 10 * heightRef,
                zIndex: 1,
              }}
            />
          )}

          {loader ? (
            <ActivityIndicator
              size={'small'}
              color={colors.primary}
              style={{
                position: 'absolute',
                right: 15 * widthRef,
                top: 12 * heightRef,
                zIndex: 1,
              }}
            />
          ) : (
            <Icon
              onPress={() => {
                // console.log('Data for Socket', {
                //   driverId: chat.driver,
                //   companyId: profile._id,
                //   message: message,
                // });
                console.log(
                  '----->',
                  JSON.stringify(
                    {
                      driverId: chat.driver,
                      companyId: profile._id,
                      sendBy: 'company',
                      message: message,
                      attachment: 'hello worlds',
                    },
                    null,
                    2,
                  ),
                );
                if (file?.uri == undefined && message == '') {
                  null;
                } else if (file?.uri == undefined) {
                  sockett.emit('driver-company-chat', {
                    driverId: chat.driver,
                    companyId: profile._id,
                    sendBy: 'company',
                    message: message,
                    attachment: '',
                  });

                  setFile({});
                } else {
                  setLoader(true);
                  dispatch(
                    uploadPicToServer(
                      {
                        image: file,
                        path: 'profile',
                      },
                      (success, d) => {
                        if (success) {
                          console.log('Success', d);
                          sockett.emit('driver-company-chat', {
                            driverId: chat.driver,
                            companyId: profile._id,
                            sendBy: 'company',
                            message: message,
                            attachment: d,
                          });

                          setFile({});
                          setLoader(false);
                        } else {
                          console.log('Fail');
                          // setImageLoading(false);
                          // setDisable(false);
                          setLoader(false);
                        }
                        return true;
                      },
                    ),
                  );
                }
              }}
              name={'send'}
              type={IconType.Feather}
              size={22 * heightRef}
              color={colors.primary}
              style={{
                position: 'absolute',
                right: 15 * widthRef,
                top: 10 * heightRef,
                zIndex: 1,
              }}
            />
          )}
        </View>
      )}
      <Modal
        backdropOpacity={0.3}
        isVisible={showOption}
        onBackdropPress={() => {
          setShowOption(false);
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.background,
            // height: 300,
            width: fullWidth,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            top: 20,
          }}>
          <Text
            language={language}
            style={{
              position: 'absolute',
              top: 15 * heightRef,
              left: 15 * widthRef,
              color: 'black',
              fontSize: fontSizes.f16,
              fontWeight: fontWeights.h500,
            }}>
            More Options
          </Text>
          <View
            style={{
              width: '97%',
              height: 25 * heightRef,
              marginBottom: 10 * heightRef,
              marginTop: 10 * heightRef,
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#F3F4F6',
                height: 25 * heightRef,
                width: 25 * heightRef,
                borderRadius: 12.5 * heightRef,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'close'}
                type={IconType.AntDesign}
                size={20 * heightRef}
                color={colors.grey250}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              // height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignSelf: 'center',
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F3F4F6',
                marginBottom: 40 * heightRef,
                padding: 15 * heightRef,
                paddingHorizontal: 0,
                width: 0.93 * fullWidth,
                marginVertical: 5,
                alignSelf: 'center',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                {
                  dispatch(
                    chatBlockUnblock(
                      route.params.data._id,
                      profile._id,
                      (success, msg) => {
                        if (success) {
                          console.log('BLOCK UNBLOCK', msg);
                          setShowOption(false);
                          setChat(msg);
                          setChatMessages(msg.messages);
                        } else {
                        }
                        return true;
                      },
                    ),
                  );
                }
              }}>
              <Icon
                onPress={() => {}}
                name={'lock'}
                type={IconType.Feather}
                size={20 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                language={language}
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {chat.status == 'BLOCKED' ? 'Unblock' : 'Block'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CompanyChatScreen;
