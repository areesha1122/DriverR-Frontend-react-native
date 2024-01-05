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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import Modal from 'react-native-modal';
import {fontWeights} from 'src/config/fontWeight';
import {fontSizes} from 'src/config/fontSize';
import {getAllDrivers} from 'src/redux/jobPosts/jobPostsSelector';
import moment from 'moment';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {getFilteredDriverz} from 'src/redux/jobPosts/jobPostsApiCalls';
import {translation} from 'src/config/translation';

const BlockedDriversScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [showOption, setShowOption] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});

  // Selectors
  const language = useSelector(getLanguage);
  const drivers = useSelector(getAllDrivers);
  const dispatch = useDispatch();

  // Effects

  // Functions
  const renderMessages = () => {
    return (
      <FlatList
        data={[1, 2]}
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
              navigation.navigate('CompanyChatScreen');
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
                source={Images.personn}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {'Hamza'}
                </Text>
                <Text language={language} style={styles.text5}>
                  {'Msg'}
                </Text>
              </View>
            </View>

            <Text language={language} style={styles.text8}>
              {moment(Date()).fromNow()}
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
        {!showSearch ? (
          <Text language={language} style={styles.text2}>
            Blocked driver{' '}
          </Text>
        ) : null}
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
                right: 25 * widthRef,
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
                right: 70 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
          </View>
        )}
        <Icon
          onPress={() => {
            setShowOption(true);
          }}
          name={'dots-three-vertical'}
          type={IconType.Entypo}
          size={18 * heightRef}
          color={colors.black}
          style={{
            position: 'absolute',
            right: 0 * widthRef,
            bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
            zIndex: 1,
          }}
        />
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
                name={'unlock'}
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
                {'Unblocked all drivers'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BlockedDriversScreen;
