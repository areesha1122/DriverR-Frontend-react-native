import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text as Text1,
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
import {
  getFilteredDriverz,
  viewProfile,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import {Socket} from 'socket.io-client';
import Text from 'src/components/text';
import {translation} from 'src/config/translation';
import AwesomeAlert from 'react-native-awesome-alerts';

const DriverListScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [gender2, setGender2] = useState('');
  const [status, setStatus] = useState('');
  const [status2, setStatus2] = useState('');
  const [experienceReq, setExperienceReq] = useState(null);
  const [experienceReq2, setExperienceReq2] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [driverDetailModal, setDriverDetailModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});
  const [driverData, setDriverData]: any = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const drivers = useSelector(getAllDrivers);
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    setDriverData(drivers);
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredDriverz(
        keyword,
        gender2,
        experienceReq2,
        status2,
        (success, msg) => {
          if (success) {
            console.log(msg);
            setDriverData(msg);
            console.log('41: Success');
          } else {
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  }, [keyword, gender2, experienceReq2, status2]);

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={driverData}
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
              setSelectedDriver(item);
              setDriverDetailModal(true);
            }}
            key={item}
            style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Icon
                name={'dots-three-vertical'}
                type={IconType.Entypo}
                size={15 * heightRef}
                color={colors.grey300}
                style={{
                  position: 'absolute',
                  right: 10 * widthRef,
                  top: 0 * heightRef,
                  zIndex: 1,
                }}
              />
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.personn}
                source={{uri: item.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.firstName + ' ' + item.lastName}
                </Text>
                <Text language={language} style={styles.text5}>
                  {item.employmentStatus}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Text language={language} style={styles.text7}>
                {item.drivingExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item.preferredLocation}
              </Text>
              <Text1 style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text1>
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
        {!showSearch ? (
          <Text language={language} style={styles.text2}>
            Drivers
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
                right: 10 * widthRef,
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
                right: 10 * widthRef,
                bottom: Platform.OS == 'ios' ? 10 * heightRef : 15 * heightRef,
                zIndex: 1,
              }}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Image
            style={[styles.imagea]}
            resizeMode="contain"
            source={Images.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchView2}>
        {keyword ? (
          <TouchableOpacity onPress={() => setKeyword('')}>
            <Text
              style={{
                color: colors.background,
                backgroundColor: colors.primary,
                padding: 6,
                paddingHorizontal: 10,
                paddingRight: 25,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              {keyword}
            </Text>
            <Icon
              onPress={() => setKeyword('')}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: Platform.OS == 'ios' ? 4 * heightRef : 7 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {gender2 ? (
          <TouchableOpacity
            onPress={() => {
              setGender2('');
            }}>
            <Text1
              style={{
                color: colors.background,
                backgroundColor: colors.primary,
                padding: 6,
                paddingHorizontal: 10,
                paddingRight: 25,
                borderRadius: 5,
                alignItems: 'center',
                marginLeft: 4 * widthRef,
              }}>
              {gender2}
            </Text1>
            <Icon
              onPress={() => setGender2('')}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: Platform.OS == 'ios' ? 4 * heightRef : 7 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {experienceReq2 ? (
          <TouchableOpacity
            onPress={() => {
              setExperienceReq2(null);
            }}>
            <Text
              style={{
                color: colors.background,
                backgroundColor: colors.primary,
                padding: 6,
                paddingHorizontal: 10,
                paddingRight: 25,
                borderRadius: 5,
                alignItems: 'center',
                marginLeft: 4 * widthRef,
              }}>
              {experienceReq2}+
            </Text>
            <Icon
              onPress={() => setExperienceReq2(null)}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: Platform.OS == 'ios' ? 4 * heightRef : 7 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {status2 ? (
          <TouchableOpacity onPress={() => setStatus2('')}>
            <Text
              style={{
                color: colors.background,
                backgroundColor: colors.primary,
                padding: 6,
                paddingHorizontal: 10,
                paddingRight: 25,
                borderRadius: 5,
                alignItems: 'center',
                marginLeft: 4 * widthRef,
              }}>
              {status2}
            </Text>
            <Icon
              onPress={() => setStatus2('')}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: Platform.OS == 'ios' ? 4 * heightRef : 7 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {renderJobs()}
      <Modal
        backdropOpacity={0.3}
        isVisible={driverDetailModal}
        onBackdropPress={() => {
          setDriverDetailModal(false);
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
          <View
            style={{
              width: '97%',
              height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignItems: 'flex-end',
            }}>
            <Icon
              onPress={() => setDriverDetailModal(false)}
              name={'close'}
              type={IconType.AntDesign}
              size={22 * heightRef}
              color={colors.grey250}
            />
          </View>
          <View
            style={{
              width: '100%',
              // height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                flexDirection: 'row',
                marginBottom: 10 * heightRef,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.image4}
                  resizeMode="cover"
                  // source={Images.personn}
                  source={{uri: selectedDriver.profilePicture}}
                />
                <View
                  style={{
                    marginTop: 20 * heightRef,
                    marginLeft: 10 * widthRef,
                  }}>
                  <Text
                    language={language}
                    style={[styles.text6, {fontSize: fontSizes.f16}]}>
                    {selectedDriver.firstName + ' ' + selectedDriver.lastName}
                  </Text>
                  {/* <Text language={language} style={[styles.text5, {marginTop: 10 * heightRef}]}>
                    Truck driver job
                  </Text> */}
                </View>
              </View>
              <Button
                onPress={() => {
                  setDriverDetailModal(false);
                  dispatch(
                    viewProfile(selectedDriver._id, (success, msg) => {
                      if (success) {
                        console.log(msg);
                        navigation.navigate('CompanyChatIntializerScreen', {
                          data: {driver: selectedDriver},
                        });
                      } else {
                        setDriverDetailModal(false);
                        setTimeout(() => {
                          setError(msg);
                          setShowError(true);
                        }, 500);
                        console.log('Image', msg);
                      }
                      return true;
                    }),
                  );
                }}
                buttonText={''}
                isIcon
                iconColor={colors.background}
                iconType={IconType.Ionicons}
                iconName={'chatbubbles-outline'}
                buttonHeight={40 * heightRef}
                borderColor={colors.primary}
                buttonWidth={0.15 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                buttonCorners={10 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{}}
              />
            </View>
            <View
              style={{
                width: fullWidth * 0.9,
                borderRadius: 5 * heightRef,
                backgroundColor: '#EFF0F9',
                marginBottom: 10 * heightRef,
              }}>
              <View
                style={{
                  width: '100%',
                  padding: 9,

                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text language={language} style={{color: colors.primary}}>
                  Contact info
                </Text>

                <TouchableOpacity>
                  <Button
                    onPress={() => {
                      // console.log(selectedDriver._id);
                      dispatch(
                        viewProfile(selectedDriver._id, (success, msg) => {
                          if (success) {
                            console.log(msg);
                            setShowFull(!showFull);
                            console.log('41: Success');
                          } else {
                            setDriverDetailModal(false);
                            setTimeout(() => {
                              setError(msg);
                              setShowError(true);
                            }, 500);
                            console.log('Image', msg);
                          }
                          return true;
                        }),
                      );
                    }}
                    buttonText={''}
                    isIcon
                    iconColor={colors.primary}
                    iconType={IconType.MaterialIcons}
                    iconName={
                      showFull ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    buttonHeight={20 * heightRef}
                    borderColor={colors.background}
                    buttonWidth={20 * heightRef}
                    buttonColor={colors.background}
                    iconSize={23 * heightRef}
                    buttonCorners={10 * heightRef}
                    buttonPosition={Alignments.center}
                    titleFontStyle={fontWeights.h500}
                    buttonstyle={{}}
                  />
                </TouchableOpacity>
              </View>
              {showFull ? (
                <View>
                  <View
                    style={{
                      width: fullWidth * 0.85,
                      height: 2 * heightRef,
                      backgroundColor: colors.background,
                      marginBottom: 10 * heightRef,

                      alignSelf: 'center',
                    }}></View>
                  <View
                    style={{
                      width: '100%',
                      padding: 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12 * widthRef,
                    }}>
                    <Text
                      language={language}
                      style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      Email:{' '}
                      <Text
                        language={language}
                        style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                        {' ' + selectedDriver.email}
                      </Text>
                    </Text>
                    <Icon
                      onPress={() => {}}
                      name={'email'}
                      type={IconType.Fontisto}
                      size={15 * heightRef}
                      color={'#4B5563'}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      language={language}
                      style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      Phone:{' '}
                      <Text
                        language={language}
                        style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                        {' ' + selectedDriver.userId.phoneNumber}
                      </Text>
                    </Text>
                    <Icon
                      onPress={() => {}}
                      name={'phone'}
                      type={IconType.Feather}
                      size={15 * heightRef}
                      color={'#4B5563'}
                    />
                  </View>
                </View>
              ) : null}
            </View>

            <View style={{justifyContent: 'flex-start', width: '100%'}}>
              <Text language={language} style={styles.texta}>
                Address
              </Text>
              <Text language={language} style={styles.textb}>
                {selectedDriver.address}
              </Text>

              <Text language={language} style={styles.texta}>
                Gender
              </Text>
              <Text language={language} style={styles.textb}>
                {selectedDriver.gender}
              </Text>
              <Text language={language} style={styles.texta}>
                Employment status
              </Text>
              <Text language={language} style={styles.textb}>
                {selectedDriver.employmentStatus}
              </Text>
              <Text language={language} style={styles.texta}>
                Driving experience
              </Text>
              <Text language={language} style={styles.textb}>
                {selectedDriver.drivingExperience}+ years
              </Text>
              <Text language={language} style={styles.texta}>
                Preferred location
              </Text>
              <Text
                language={language}
                style={[styles.textb, {marginBottom: 20}]}>
                {selectedDriver.preferredLocation}
              </Text>
            </View>
            <View
              style={{
                height: 0.25 * fullHeight,
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  marginLeft: 5,
                }}>
                <Text language={language} style={styles.texta}>
                  Driving License
                </Text>
                <View
                  style={{
                    backgroundColor: colors.background,
                    height: 100 * heightRef,
                    width: 160 * widthRef,
                    marginLeft: 10 * widthRef,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#DADADA',
                    borderRadius: 2 * heightRef,
                  }}>
                  <Image
                    style={styles.image3a}
                    resizeMode="cover"
                    // source={Images.default}
                    source={{uri: selectedDriver.drivingLicense}}
                  />
                </View>
                <Text
                  onPress={() => {
                    setDriverDetailModal(false);
                    navigation.navigate('ViewImgScreen', {
                      data: selectedDriver.drivingLicense,
                    });
                  }}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  {'View'}
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                }}>
                <Text language={language} style={styles.texta}>
                  Driving certificate
                </Text>
                <View
                  style={{
                    backgroundColor: colors.background,
                    height: 100 * heightRef,
                    width: 160 * widthRef,
                    marginLeft: 10 * widthRef,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#DADADA',
                    borderRadius: 2 * heightRef,
                  }}>
                  <Image
                    style={styles.image3a}
                    resizeMode="cover"
                    source={{uri: selectedDriver.drivingCertificate}}
                  />
                </View>
                <Text
                  onPress={() => {
                    setDriverDetailModal(false);
                    navigation.navigate('ViewImgScreen', {
                      data: selectedDriver.drivingCertificate,
                    });
                  }}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  {'View'}
                </Text>
              </View>
            </View>
            {/* <Text language={language} style={styles.texta}>Driving license</Text>
            <Text language={language} style={styles.texta}>Driving certificate</Text> */}
            {/* <Text language={language} style={styles.textb}>
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </Text> */}
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={showFilter}
        onBackdropPress={() => {
          setShowFilter(false);
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.background,
            height: 0.75 * fullHeight,
            width: fullWidth,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            top: 20,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              width: '97%',
              height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignItems: 'flex-end',
            }}>
            <Icon
              onPress={() => setShowFilter(false)}
              name={'close'}
              type={IconType.AntDesign}
              size={22 * heightRef}
              color={colors.grey250}
            />
          </View>
          <Text language={language} style={[styles.text9]}>
            Search Filter
          </Text>

          <Text language={language} style={styles.text10}>
            Gender
          </Text>
          <FlatList
            data={['Male', 'Female']}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 100,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setGender(item);
                }}>
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    borderWidth: gender == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      gender == item ? colors.primary : colors.grey300,
                    color: gender == item ? colors.primary : colors.grey300,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text language={language} style={styles.text10}>
            Experience required
          </Text>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 210 * heightRef,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setExperienceReq(item);
                }}>
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 15,
                    borderWidth: experienceReq == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      experienceReq == item ? colors.primary : colors.grey300,
                    color:
                      experienceReq == item ? colors.primary : colors.grey300,
                  }}>
                  {item}+ years
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text language={language} style={styles.text10}>
            Employment Status
          </Text>
          <FlatList
            data={['Employed', 'Unemployed']}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 100,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setStatus(item);
                }}>
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    borderWidth: gender == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      status == item ? colors.primary : colors.grey300,
                    color: status == item ? colors.primary : colors.grey300,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button
            onPress={() => {
              setGender2(gender);
              setExperienceReq2(experienceReq);
              setStatus2(status);
              setShowFilter(false);
              setGender('');
              setExperienceReq(null);
              setStatus('');
              // navigation.navigate('PersonalInfoStep1Screen');
            }}
            buttonText={'Apply Filter'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginVertical: 20 * heightRef}}
          />
        </View>
      </Modal>

      <AwesomeAlert
        show={showError}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={error}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        messageStyle={{textAlign: 'center'}}
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowError(false);
        }}
        onDismiss={() => {
          setShowError(false);
        }}
      />
    </SafeAreaView>
  );
};

export default DriverListScreen;
