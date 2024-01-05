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
import {
  getCompanyNotifications,
  getCompanyNotificationsCounter,
  markAsRead,
} from 'src/redux/notification/notificationsApiCalls';
import {translation} from 'src/config/translation';

const CompanyNotificationScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [searchData, setSearchData]: any = useState({});
  const [keyword, setKeyword] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [chatData, setChatData]: any = useState([]);

  const [showOption, setShowOption] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});

  // Selectors
  const drivers = useSelector(getAllDrivers);
  const language = useSelector(getLanguage);
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  // Effects
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getCompanyNotifications(profile._id, (success, msg) => {
          if (success) {
            console.log('41: Success');
            setChatData(msg.reverse());
            dispatch(
              markAsRead(
                {
                  id: profile._id,
                  userType: 'COMPANY',
                  notificationsIds: msg.map((item: any) => item._id),
                },
                (success, msg) => {
                  if (success) {
                    console.log('41: Success');
                    dispatch(
                      getCompanyNotificationsCounter(
                        profile._id,
                        (success, msg) => {
                          if (success) {
                            console.log('----->>>>> lll', msg);
                          } else {
                          }
                          return true;
                        },
                      ),
                    );
                  } else {
                  }
                  return true;
                },
              ),
            );
            console.log();
          } else {
          }
          return true;
        }),
      );
    }, []),
  );

  // Functions
  const searchFilter = (text: string) => {
    setSearch(text);
    console.log(text);
    const filteredResults = chatData.filter((item: any) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filteredResults.length);
    setSearchData(filteredResults);
  };

  const renderMessages = () => {
    return (
      <FlatList
        data={search ? searchData : chatData}
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
          <View key={item} style={[styles.msgCard]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Image
                style={styles.image3}
                resizeMode="contain"
                source={Images.notification}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <Text style={styles.text6}>{item?.title}</Text>
                  <Text style={styles.text8}>
                    {moment(item?.receivingTime).fromNow()}
                  </Text>
                </View>
                <Text style={styles.text5}>{item?.message}</Text>
              </View>
            </View>
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
        {!showSearch ? <Text style={styles.text2}>Notification</Text> : null}
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
                right: 15 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
            <TextInput
              style={styles.input}
              onChangeText={searchFilter}
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
                right: 25 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
          </View>
        )}
      </View>

      {renderMessages()}
    </SafeAreaView>
  );
};

export default CompanyNotificationScreen;
