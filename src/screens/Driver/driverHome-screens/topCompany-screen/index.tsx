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
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {useSelector} from 'react-redux';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import {getLanguage} from 'src/redux/auth/authSelector';

const CompanyDetailScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();

  // States
  const [tab, setTab] = useState('Overview');
  const [showFull, setShowFull] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const jobs = useSelector(getJobPostss).filter(
    (i: any) => i.isDeleted == false && i.isActive == true,
  );

  // Effects
  useEffect(() => {
    console.log(route);
  }, []);

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={jobs.reverse()}
        horizontal={false}
        showsVerticalScrollIndicator={false}
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
              <Image
                style={styles.image3a}
                resizeMode="cover"
                source={{uri: route.params.data.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6a}>
                  {item.title}
                </Text>
                <Text
                  language={language}
                  numberOfLines={1}
                  style={styles.text5a}>
                  {item.jobDescription}
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
      <View style={styles.mainView}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          isButtonText={false}
          buttonHeight={33 * heightRef}
          buttonWidth={33 * heightRef}
          isIcon
          buttonColor={colors.background}
          iconSize={20 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          buttonstyle={{marginTop: 10 * heightRef, marginLeft: 15 * widthRef}}
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Image
          style={styles.image3}
          resizeMode="cover"
          source={{uri: route.params.data.profilePicture}}
        />
      </View>

      <Text language={language} style={styles.text3}>
        {route.params.data.name}
      </Text>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20, width: '100%'}}>
        <Text language={language} style={styles.textInactive}>
          About
        </Text>
        <Text
          language={language}
          style={[styles.text5, {width: '93%', marginLeft: '4%'}]}>
          {' '}
          {route.params.data.aboutInfo}
        </Text>
        {showFull ? (
          <View style={{width: '93%', marginLeft: '4%'}}>
            <Text language={language} style={styles.text4}>
              Registration Number
            </Text>
            <Text language={language} style={styles.text5}>
              {route.params.data.registrationNumber}
            </Text>
            <Text language={language} style={styles.text4}>
              Company Size
            </Text>
            <Text language={language} style={styles.text5}>
              {route.params.data.companySize}
            </Text>
            <Text language={language} style={styles.text4}>
              Founded
            </Text>
            <Text language={language} style={styles.text5}>
              {moment(route.params.data.establishDate).format('DD-MM-YYYY')}
            </Text>
            <Text language={language} style={styles.text4}>
              Location
            </Text>
            <Text language={language} style={styles.text5}>
              {route.params.data.address}
            </Text>
            {/* <Text language={language} style={[styles.text4, {color: colors.info}]}>
              Get Directions
              <Icon
                name={'arrow-up-right'}
                type={IconType.Feather}
                size={14 * heightRef}
                color={colors.info}
                style={{
                  position: 'absolute',
                  right: 0 * widthRef,
                  top: 5 * heightRef,
                  zIndex: 1,
                }}
              />
            </Text> */}
          </View>
        ) : null}
        <View
          style={{
            backgroundColor: '#F2F4FF',
            width: 0.3 * fullWidth,
            alignSelf: 'center',
            marginTop: 4 * heightRef,
            paddingBottom: 5,
            borderRadius: 20 * heightRef,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{padding: 0}}
            onPress={() => setShowFull(!showFull)}
            style={[styles.text6, {color: colors.primary}]}>
            {showFull ? 'See less details' : 'See all details'}
          </Text>
          <Icon
            name={showFull ? 'up' : 'down'}
            type={IconType.AntDesign}
            size={13}
            color={colors.primary}
            style={{
              alignSelf: 'center',
              top: 2 * heightRef,
              marginLeft: 2 * widthRef,
            }}
          />
        </View>

        <Text
          language={language}
          style={[styles.text9, {marginLeft: 15 * widthRef}]}>
          Jobs
        </Text>
        {renderJobs()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetailScreen;
