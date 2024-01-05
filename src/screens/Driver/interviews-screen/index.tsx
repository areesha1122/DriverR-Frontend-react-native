import React, {useEffect, useState} from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text as Text1,
  ViewComponent,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Snackbar from 'react-native-snackbar';
import Button, {Alignments} from 'src/components/button';
import {
  fontRef,
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
  getDriverInterviews,
  getJobApplications,
  getJobPosts,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {
  getDriverInterviewss,
  getJobApplicationss,
  getJobPostss,
} from 'src/redux/jobPosts/jobPostsSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import Text from 'src/components/text';

const JobsInterviewsScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const user = useSelector(getProfile);

  // States
  const [refreash, setRefreash] = useState(false);
  const [interviews, setInterviews]: any = useState(
    useSelector(getDriverInterviewss),
  );

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const counter = useSelector(getNotificationCouterr);

  // Effects
  useEffect(() => {
    user
      ? dispatch(
          getDriverInterviews(profile._id, (success, msg) => {
            if (success) {
              console.log('41: Success');
            } else {
              console.log('Image', msg);
            }
            return true;
          }),
        )
      : null;
  }, []);

  const onRefreash = React.useCallback(() => {
    user
      ? dispatch(
          getDriverInterviews(profile._id, (success, msg) => {
            if (success) {
              console.log('41: Success');
              setRefreash(false);
              setInterviews(msg.reverse());
            } else {
              setRefreash(false);
              console.log('Image', msg);
            }
            return true;
          }),
        )
      : null;
  }, []);
  useFocusEffect(onRefreash);

  // Functions

  const renderJobs = () => {
    return (
      <FlatList
        data={interviews}
        horizontal={false}
        onRefresh={onRefreash}
        refreshing={refreash}
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
                source={{uri: item.jobApplicationId.companyId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.jobApplicationId.jobId.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.jobApplicationId.companyId.name}
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
                {item.jobApplicationId.jobId.requiredExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item.jobApplicationId.jobId.routeType}
              </Text>

              <Text1 style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text1>
            </View>
            {Math.round((new Date(item.scheduledAt) - new Date()) / 60000) <
              15 &&
            Math.round((new Date(item.scheduledAt) - new Date()) / 60000) >
              0 ? (
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
                width: '100%',
                padding: 2,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12 * widthRef,
                paddingVertical: 10 * heightRef,
              }}>
              <Text
                language={language}
                style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
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
              <Text
                language={language}
                style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
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
              fontWeight: fontWeights.h700,
              color: colors.black,
              margin: 10,
            }}>
            Interview
          </Text>
        </View>

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
              navigation.navigate('DriverNotificationScreen');
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

      {renderJobs()}
    </SafeAreaView>
  );
};

export default JobsInterviewsScreen;
