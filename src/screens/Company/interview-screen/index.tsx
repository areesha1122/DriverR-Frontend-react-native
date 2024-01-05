import React, {useEffect, useState} from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  Text as Text2,
  TouchableOpacity,
  View,
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
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLanguage,
  getNotificationCouterr,
  getProfile,
} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {
  getCompanyInterviews,
  getJobPosts,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import {
  getCompanyInterViewss,
  getJobPostss,
} from 'src/redux/jobPosts/jobPostsSelector';
import Text from 'src/components/text';
import Snackbar from 'react-native-snackbar';

const CompanyInterviewScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const currentTime = Date();

  // States
  const [search, setSearch] = useState('');

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const counter = useSelector(getNotificationCouterr);

  const jobPosts = useSelector(getCompanyInterViewss);
  console.log(JSON.stringify(jobPosts, null, 2));

  // Effects
  useEffect(() => {
    dispatch(
      getCompanyInterviews(profile._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
        }
        return true;
      }),
    );
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getCompanyInterviews(profile._id, (success, msg) => {
          if (success) {
            console.log('41: Success');
          } else {
          }
          return true;
        }),
      );
    }, []),
  );

  // Functions

  const renderJobs = () => {
    return (
      <FlatList
        data={jobPosts
          .filter((item: any) => new Date(item.scheduledAt) > new Date())
          .reverse()}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 15 * heightRef,
          zIndex: -1,
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
              language={language}
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
            disabled
            key={item}
            style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.logo2}
                source={{uri: item.jobApplicationId.driverId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.jobApplicationId.driverId.firstName +
                    ' ' +
                    item.jobApplicationId.driverId.lastName}
                </Text>
                <Text
                  language={language}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.jobApplicationId.jobId.title}
                </Text>
              </View>
            </View>
            {Math.round((new Date(item.scheduledAt) - new Date()) / 60000) <
            15 ? (
              <TouchableOpacity
                style={{position: 'absolute', top: 20, right: 20}}>
                <Button
                  onPress={() => {
                    Linking.openURL(item.onlineInterviewLink);
                  }}
                  buttonText={'Join'}
                  titleFontSize={12}
                  buttonHeight={25 * heightRef}
                  borderColor={'#1153DA'}
                  buttonWidth={50 * heightRef}
                  buttonColor={'#1153DA'}
                  iconSize={23 * heightRef}
                  buttonCorners={5 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{}}
                />
              </TouchableOpacity>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Text language={language} style={styles.text7}>
                {item.jobApplicationId.jobId.requiredExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item.jobApplicationId.jobId.routeType}
              </Text>

              <Text2 style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text2>
            </View>
            <View
              style={{
                width: '100%',
                padding: 2,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12 * widthRef,
                paddingVertical: 10 * heightRef,
              }}>
              <Text style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                {item.onlineInterviewLink}
              </Text>

              <Icon
                onPress={() => {
                  Clipboard.setString(item.onlineInterviewLink);
                  Snackbar.show({
                    text: 'Link copied',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                }}
                name={'content-copy'}
                type={IconType.MaterialIcons}
                size={15 * heightRef}
                color={'#4B5563'}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingBottom: 9,
                paddingHorizontal: 12 * widthRef,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: -5 * heightRef,
              }}>
              <Text style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                Scheduled at{' '}
                {moment(item.scheduledAt).format('MMMM Do YYYY, h:mm a')}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.shadow2}>
            <Button
              onPress={() => {
                navigation.openDrawer();
              }}
              isButtonText={false}
              buttonHeight={40 * heightRef}
              buttonWidth={40 * heightRef}
              isIcon
              buttonColor={colors.background}
              iconSize={30 * heightRef}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.flex_start}
              iconName={'ios-reorder-three-outline'}
              iconType={'Ionicons'}
            />
          </View>

          <Text
            language={language}
            style={{
              fontSize: fontSizes.f22,
              fontWeight: fontWeights.h600,
              color: colors.black,
              margin: 10,
            }}>
            Interview
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            {counter > 0 ? (
              <View
                style={{
                  backgroundColor: '#EAB308',
                  height: 18 * heightRef,
                  width: 18 * heightRef,
                  position: 'absolute',
                  // top: 7 * heightRef,
                  borderRadius: 18 * heightRef,
                  zIndex: 1000,
                  borderWidth: 2 * heightRef,
                  borderColor: colors.background,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  language={language}
                  style={{fontSize: fontSizes.f9, color: colors.background}}>
                  {counter}
                </Text>
              </View>
            ) : null}
            <Icon
              onPress={() => {
                navigation.navigate('CompanyNotificationScreen');
              }}
              name={'bell'}
              type={IconType.Fontisto}
              size={25 * heightRef}
              color={'#64748B'}
              style={{
                // position: 'absolute',
                right: 10 * widthRef,
                // top: 7 * heightRef,

                // zIndex: 1,
              }}
            />
          </View>
        </View>
      </View>
      {renderJobs()}
    </SafeAreaView>
  );
};

export default CompanyInterviewScreen;
