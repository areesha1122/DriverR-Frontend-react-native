import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import InputFeild from 'src/components/inputFeild';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import Modal from 'react-native-modal';
import {fontWeights} from 'src/config/fontWeight';
import {fontSizes} from 'src/config/fontSize';
import {getAllDrivers} from 'src/redux/jobPosts/jobPostsSelector';
import moment from 'moment';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {getFilteredDriverz} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getMessagesList} from 'src/redux/chat/chatApiCalls';
import {getUserChatss} from 'src/redux/chat/chatSelector';
import {translation} from 'src/config/translation';

const CompanyMessagesScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [chatData, setChatData]: any = useState([]);

  const [showOption, setShowOption] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});

  // Selectors
  const drivers = useSelector(getAllDrivers);
  const Chatss = useSelector(getUserChatss);
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const language = useSelector(getLanguage);

  // Effects
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        dispatch(
          getMessagesList(profile._id, (success, msg) => {
            if (success) {
              console.log('UseFocus');
            } else {
            }
            return true;
          }),
        );
      }, 2000);
    }, []),
  );
  useEffect(() => {
    dispatch(
      getMessagesList(profile._id, (success, msg) => {
        if (success) {
          console.log('UseEffect', JSON.stringify(Chatss, null, 2));
        } else {
        }
        return true;
      }),
    );
  }, []);

  // Functions
  const renderMessages = () => {
    return (
      <FlatList
        data={Chatss}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: fullHeight * 0.7,
            }}>
            <Image
              style={{
                height: 100 * heightRef,
                width: 100 * heightRef,
              }}
              resizeMode="contain"
              source={Images.noData}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: fontSizes.f17,
                fontWeight: fontWeights.w700,
                color: colors.grey250,
              }}>
              No results found
            </Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <View
            onTouchEnd={() => {
              console.log('=====>>>>', item);
              navigation.navigate('CompanyChatScreen', {data: item});
            }}
            key={item}
            style={[styles.msgCard]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Image
                style={styles.image3}
                resizeMode="contain"
                source={{uri: item?.driver?.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text style={styles.text6}>
                  {item?.driver?.firstName + ' ' + item?.driver?.lastName}
                </Text>
                <Text style={styles.text5}>
                  {item?.messages[item?.messages?.length - 1]?.message}
                </Text>
              </View>
            </View>

            <Text style={styles.text8}>
              {moment(
                item?.messages?.[item?.messages?.length - 1]?.createdAt,
              ).fromNow()}
            </Text>
            {item?.unreadCount > 0 ? (
              <View
                style={{
                  height: 17 * heightRef,
                  width: 17 * heightRef,
                  backgroundColor: 'red',
                  borderRadius: 10 * heightRef,
                  position: 'absolute',
                  right: 20 * widthRef,
                  top: 30 * heightRef,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: fontSizes.f10, color: colors.white}}>
                  {item?.unreadCount}
                </Text>
              </View>
            ) : null}
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
        {!showSearch ? <Text style={styles.text2}>Message</Text> : null}
        {showSearch ? (
          <View>
            <Icon
              onPress={() => {
                search == ''
                  ? setShowSearch(false)
                  : (setKeyword(search), setShowSearch(false), setSearch(''));
              }}
              name={'search'}
              type={IconType.EvilIcons}
              size={25 * heightRef}
              color={colors.grey300}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
            <TextInput
              style={styles.input}
              onChangeText={setSearch}
              value={search}
              placeholder={
                language == 'Romanian'
                  ? translation['Search'] || 'Search'
                  : 'Search'
              }
              placeholderTextColor={'gray'}
            />
          </View>
        ) : (
          <View style={[styles.input2]}>
            <Icon
              onPress={() => setShowSearch(true)}
              name={'search'}
              type={IconType.EvilIcons}
              size={25 * heightRef}
              color={colors.black}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
          </View>
        )}
      </View>

      {renderMessages()}
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
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {'Blocked drivers'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CompanyMessagesScreen;
