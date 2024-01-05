import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
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
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import {getDriverFaqs} from 'src/redux/support-faqs/supportApiCalls';
import Text from 'src/components/text';
import {
  getCompanyFaq,
  getDriverFaq,
} from 'src/redux/support-faqs/supportSelector';

const FaqScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [selectedId, setSelectedId]: any = useState();

  // Selectors
  const language = useSelector(getLanguage);
  const jobPosts = useSelector(getJobPostss);
  const driverFaqs = useSelector(getCompanyFaq);
  console.log(JSON.stringify(jobPosts, null, 2));

  // Effects
  useEffect(() => {
    dispatch(
      getDriverFaqs(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);

  // Functions

  const renderJobs = () => {
    return (
      <FlatList
        data={driverFaqs}
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
              if (index == selectedId) {
                setSelectedId(null);
              } else setSelectedId(index);
            }}
            key={item}
            style={[styles.jobCard]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (index == selectedId) {
                    setSelectedId(null);
                  } else setSelectedId(index);
                }}
                style={{
                  position: 'absolute',
                  right: 15 * widthRef,
                  top: 17 * heightRef,
                  zIndex: 1,
                }}>
                <Icon
                  name={index == selectedId ? 'caretup' : 'caretdown'}
                  type={IconType.AntDesign}
                  size={12 * heightRef}
                  color={'#1153DA'}
                />
              </TouchableOpacity>

              <View>
                <Text language={language} style={styles.text6}>
                  {item.question}
                </Text>
                {index == selectedId ? (
                  <Text language={language} style={styles.text7}>
                    {item.answer}
                  </Text>
                ) : null}
              </View>
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
          <View>
            <Button
              onPress={() => {
                navigation.goBack();
                navigation.openDrawer();
              }}
              isButtonText={false}
              buttonHeight={32 * heightRef}
              buttonWidth={32 * heightRef}
              isIcon
              buttonColor={colors.grey100}
              iconSize={18 * heightRef}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.flex_start}
              buttonstyle={styles.backButton}
              iconName={'arrow-back-sharp'}
              iconType={'Ionicons'}
            />
          </View>

          <Text
            language={language}
            style={{
              fontSize: fontSizes.f22,
              fontWeight: fontWeights.h600,
              color: colors.black,
              margin: 10 * heightRef,
            }}>
            FAQs
          </Text>
        </View>
      </View>

      {renderJobs()}
    </SafeAreaView>
  );
};

export default FaqScreen;
