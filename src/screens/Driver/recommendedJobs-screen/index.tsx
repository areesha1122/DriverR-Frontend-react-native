import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
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
import {
  getActiveJobPostss,
  getAllDrivers,
} from 'src/redux/jobPosts/jobPostsSelector';
import moment from 'moment';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {
  getFilteredDriverz,
  getFilteredJobz,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import {translation} from 'src/config/translation';

const RecommendedJobListScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [routeType, setRouteType] = useState('');
  const [routeType2, setRouteType2] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentType2, setEquipmentType2] = useState('');
  const [experienceReq, setExperienceReq] = useState(null);
  const [experienceReq2, setExperienceReq2] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [driverDetailModal, setDriverDetailModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});
  const [jobsData, setJobsData]: any = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const activeJobs = useSelector(getActiveJobPostss)
    .reverse()
    .filter((i: any) => i.isDeleted == false && i.isActive == true)
    .reverse();
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    setJobsData(activeJobs);
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredJobz(
        keyword,
        routeType2,
        experienceReq2,
        equipmentType2,
        (success, msg) => {
          if (success) {
            console.log(msg);
            setJobsData(
              msg
                .filter((i: any) => i.isDeleted == false && i.isActive == true)
                .reverse(),
            );
            console.log('41: Success');
          } else {
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  }, [keyword, routeType2, experienceReq2, equipmentType2]);

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={jobsData}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JobDetailScreen', {
                data: item,
              });
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
                // source={Images.logo2}
                source={{uri: item.companyId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.title}
                </Text>
                <Text language={language} style={styles.text5}>
                  {item.companyId.name}
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
                {item.requiredExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item.routeType}
              </Text>
              <Text language={language} style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
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
        <Text language={language} style={styles.text2}>
          Jobs
        </Text>
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
                bottom: 15 * heightRef,
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
                bottom: 15 * heightRef,
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
                marginTop: 10 * heightRef,
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
                top: 15 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {routeType2 ? (
          <TouchableOpacity
            onPress={() => {
              setRouteType2('');
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
                marginTop: 10 * heightRef,
                marginLeft: 4 * widthRef,
              }}>
              {routeType2}
            </Text>
            <Icon
              onPress={() => setRouteType2('')}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: 15 * heightRef,
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
                marginTop: 10 * heightRef,
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
                top: 15 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
        {equipmentType2 ? (
          <TouchableOpacity onPress={() => setEquipmentType2('')}>
            <Text
              style={{
                color: colors.background,
                backgroundColor: colors.primary,
                padding: 6,
                paddingHorizontal: 10,
                paddingRight: 25,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10 * heightRef,
                marginLeft: 4 * widthRef,
              }}>
              {equipmentType2}
            </Text>
            <Icon
              onPress={() => setEquipmentType2('')}
              name={'cancel'}
              type={IconType.MaterialIcons}
              size={20 * heightRef}
              color={colors.background}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                top: 15 * heightRef,
                zIndex: 1,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {renderJobs()}

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
            height: 0.95 * fullHeight,
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
            Route Type
          </Text>

          <FlatList
            data={[
              'Albania',
              'Andorra',
              'Austria',
              'Belarus',
              'Belgium',
              'Bulgaria',
              'Croația',
              'Czech Republic',
              'Denmark',
              'France',
              'Germany',
              'Greece',
              'Hungary',
              'Italy',
              'Luxemburg',
              'Macedonia',
              'Moldova',
              'Netherlands',
              'Norway',
              'Poland',

              'Portugalia',
              'Serbia',
              'Slovakia',
              'Slovenia',
              'Spain',
              'Sweden',
              'Switzerland',
              'Turkey',
              'Ucraina',
              'United Kingdom',
            ]}
            horizontal={false}
            numColumns={4}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 180,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setRouteType(item);
                }}>
                <Text
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderWidth: routeType == item ? 1 : 0.5,
                    marginBottom: 10,
                    fontSize: fontSizes.f11,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      routeType == item ? colors.primary : colors.grey300,
                    color: routeType == item ? colors.primary : colors.grey300,
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
              maxHeight: 210,
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
                    padding: 5,
                    paddingHorizontal: 10,
                    borderWidth: experienceReq == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,

                    fontSize: fontSizes.f11,
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
            Equipment Type
          </Text>
          <FlatList
            data={[
              'Tautliner & Box (3.5 Ton)',
              'Tautliner',
              'Box',
              'Tautliner & Box (7.5 Ton)',
              'Frigo',
              'Bulk',
              'Tautliner & Box (12 Ton)',

              'Oversized',
              'Jumbo (40 Ton)',
              'Chassie for the container',
              'Car transporter',
            ]}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 200,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setEquipmentType(item);
                }}>
                <Text
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderWidth: routeType == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    fontSize: fontSizes.f11,
                    borderColor:
                      equipmentType == item ? colors.primary : colors.grey300,
                    color:
                      equipmentType == item ? colors.primary : colors.grey300,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button
            onPress={() => {
              setRouteType2(routeType);
              setExperienceReq2(experienceReq);
              setEquipmentType2(equipmentType);
              setShowFilter(false);
              setRouteType('');
              setExperienceReq(null);
              setEquipmentType('');
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
    </SafeAreaView>
  );
};

export default RecommendedJobListScreen;
