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
  fontRef,
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import InputFeild, {keyboardTypes} from 'src/components/inputFeild';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import {getAdsOns, getAllPlans, getStripe} from 'src/redux/plans/plansApiCalls';
import {getAdsOnss, getAllPlanss} from 'src/redux/plans/plansSelector';
import {getCompanyPlan} from 'src/redux/plans/plansSelector';

const BuySubscriptionScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const plans = [
    {
      name: 'Basic',
      price: 100,
    },
    {
      name: 'Standard',
      price: 350,
    },
    {
      name: 'Premium',
      price: 500,
    },
  ];
  const features = [
    {
      text: 'Post jobs (2 job posts are allowed)',
      provided: true,
    },
    {
      text: 'Show drivers profile without posting jobs (10)',
      provided: true,
    },
    {
      text: 'Show compatible drivers according to posted jobs',
      provided: true,
    },
    {
      text: 'Internal notes for interviews',
      provided: true,
    },
    {
      text: 'Video meeting for driver interviews',
      provided: true,
    },
    {
      text: 'A maximum number of applicants can apply for a job post (80)',
      provided: true,
    },
  ];

  // States
  const [DetailPlanData, setDetailPlanData]: any = useState({});
  const [detailPlan, setDetailPlan] = useState(false);
  const [additionalJobs, setAdditionalJobs]: any = useState(0);
  const [driverProfiles, setDriverProfiles]: any = useState(0);
  const [additionalJobsAdson, setAdditionalJobsAdson]: any = useState({});
  const [driverProfilesAdsOn, setDriverProfilesAdsOn]: any = useState({});

  // Selectors
  const language = useSelector(getLanguage);
  const subscriptionPlans = useSelector(getAllPlanss);
  const Addons = useSelector(getAdsOnss);
  const profile = useSelector(getProfile);
  const companyPlan = useSelector(getCompanyPlan);

  // Effects
  useEffect(() => {
    dispatch(
      getAllPlans(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      getAdsOns(undefined, (success, msg) => {
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
        data={subscriptionPlans}
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
            onPress={() => {}}
            key={item}
            disabled
            style={[
              styles.jobCard,
              styles.shadow,
              {
                borderWidth:
                  item.stripeProductId ==
                  companyPlan?.items?.data?.[0]?.plan.product
                    ? 1
                    : 0,
                borderColor: colors.success,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15 * heightRef,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginLeft: 10 * widthRef,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#C9E1FB',
                    height: 40 * heightRef,
                    width: 40 * heightRef,
                    borderRadius: 20 * heightRef,
                  }}>
                  <Image
                    source={Images.plans}
                    style={{height: 20 * heightRef, width: 20 * heightRef}}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    fontSize: fontSizes.f16,
                    fontWeight: fontWeights.h500,
                    marginLeft: 10 * widthRef,
                    color: colors.black,
                  }}>
                  {item.name}
                </Text>
              </View>
              <Button
                onPress={() => {
                  console.log(
                    'DATA====>>>>',
                    JSON.stringify(
                      {
                        successUrl:
                          'https://dev.tirminator.com/payment/payment-success',
                        cancelUrl:
                          'https://dev.tirminator.com/payment/payment-failed',
                        priceId: item.stripePriceId,
                        mode: 'subscription',
                        allowPromotionCodes: false,
                        userId: profile._id,
                        quantity: 1,
                        isAddon: false,
                      },
                      null,
                      2,
                    ),
                  );
                  dispatch(
                    getStripe(
                      {
                        successUrl:
                          'https://dev.tirminator.com/payment/payment-success',
                        cancelUrl:
                          'https://dev.tirminator.com/payment/payment-failed',
                        priceId: item.stripePriceId,
                        mode: 'subscription',
                        allowPromotionCodes: false,
                        userId: profile._id,
                        quantity: 1,
                        isAddon: false,
                      },
                      (success, msg) => {
                        if (success) {
                          console.log('41: Success');
                          navigation.navigate('StripeScreen', {
                            url: msg,
                            priceId: item.stripePriceId,
                          });
                        } else {
                          console.log('Image', msg);
                        }
                        return true;
                      },
                    ),
                  );
                }}
                buttonText={'Buy'}
                buttonHeight={38 * heightRef}
                buttonWidth={0.18 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                // isLoading={loader}
                buttonCorners={8 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginRight: 12 * widthRef}}
              />
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#E4E4E4',
                marginTop: 15 * heightRef,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15 * heightRef,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginLeft: 10 * widthRef,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: fontSizes.f28,
                    fontWeight: fontWeights.h600,
                    // marginLeft: 10 * widthRef,
                    color: '#344054',
                  }}>
                  €{item.price}
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.f14,
                    fontWeight: fontWeights.h400,
                    marginLeft: 3 * widthRef,
                    color: '#667085',
                    marginBottom: 4 * heightRef,
                  }}>
                  12 months
                </Text>
              </View>
              <Button
                onPress={() => {
                  setDetailPlan(true);
                  setDetailPlanData(item);
                  console.log(JSON.stringify(companyPlan, null, 2));
                  setTimeout(() => {
                    console.log(
                      Addons.filter(
                        (i: any) =>
                          i.name.split(' ')[0] == item.name.split(' ')[0],
                      ),
                    );
                    setAdditionalJobsAdson(
                      Addons.filter(
                        (i: any) =>
                          i.name.split(' ')[0] == item.name.split(' ')[0] &&
                          i.name.split(' ')[1] == 'Job',
                      )[0],
                    );
                    setDriverProfilesAdsOn(
                      Addons.filter(
                        (i: any) =>
                          i.name.split(' ')[0] == item.name.split(' ')[0] &&
                          i.name.split(' ')[1] == 'Contacts',
                      )[0],
                    );
                  }, 1000);
                }}
                buttonText={'See more'}
                buttonHeight={28 * heightRef}
                buttonWidth={0.22 * fullWidth}
                buttonColor={'#F2F4FF'}
                iconSize={25}
                // isLoading={loader}
                buttonCorners={44 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h400}
                titleColor={colors.primary}
                titleFontSize={fontSizes.f12}
                buttonstyle={{marginRight: 12 * widthRef}}
              />
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
              buttonstyle={{}}
              iconName={'arrow-back-sharp'}
              iconType={'Ionicons'}
            />
          </View>

          <Text
            style={{
              fontSize: fontSizes.f22,
              fontWeight: fontWeights.h600,
              color: colors.black,
              margin: 10,
            }}>
            Subscription plan
          </Text>
        </View>
      </View>

      {renderJobs()}

      <Modal
        backdropOpacity={0.3}
        isVisible={detailPlan}
        onBackdropPress={() => {
          setDetailPlan(false);
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
              flexDirection: 'row',
              marginTop: 20 * heightRef,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: 10 * widthRef,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#C9E1FB',
                  height: 35 * heightRef,
                  width: 35 * heightRef,
                  borderRadius: 20 * heightRef,
                }}>
                <Image
                  source={Images.plans}
                  style={{height: 20 * heightRef, width: 20 * heightRef}}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  fontSize: fontSizes.f18,
                  fontWeight: fontWeights.h600,
                  marginLeft: 10 * widthRef,
                  color: colors.black,
                }}>
                {DetailPlanData.name}
              </Text>
            </View>
            <View
              style={{
                height: 30 * heightRef,
                width: 30 * heightRef,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15 * heightRef,
                backgroundColor: '#F3F4F6',
              }}>
              <Icon
                onPress={() => setDetailPlan(false)}
                name={'close'}
                type={IconType.AntDesign}
                size={22 * heightRef}
                color={colors.grey250}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25 * heightRef,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: 10 * widthRef,
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: fontSizes.f28,
                  fontWeight: fontWeights.h600,
                  // marginLeft: 10 * widthRef,
                  color: '#344054',
                }}>
                €{DetailPlanData.price}
              </Text>
              <Text
                style={{
                  fontSize: fontSizes.f14,
                  fontWeight: fontWeights.h400,
                  marginLeft: 3 * widthRef,
                  color: '#667085',
                  marginBottom: 4 * heightRef,
                }}>
                12 months
              </Text>
            </View>
            <Button
              onPress={() => {
                setDetailPlan(false);
                dispatch(
                  getStripe(
                    {
                      successUrl:
                        'https://dev.tirminator.com/payment/payment-success',
                      cancelUrl:
                        'https://dev.tirminator.com/payment/payment-failed',
                      priceId: DetailPlanData.stripePriceId,
                      mode: 'subscription',
                      allowPromotionCodes: false,
                      userId: profile._id,
                      quantity: 1,
                      isAddon: false,
                    },
                    (success, msg) => {
                      if (success) {
                        console.log('41: Success');
                        navigation.navigate('StripeScreen', {
                          url: msg,
                          priceId: DetailPlanData.stripePriceId,
                        });
                      } else {
                        console.log('Image', msg);
                      }
                      return true;
                    },
                  ),
                );
              }}
              buttonText={'Buy'}
              buttonHeight={38 * heightRef}
              buttonWidth={0.18 * fullWidth}
              buttonColor={colors.primary}
              iconSize={25}
              // isLoading={loader}
              buttonCorners={8 * heightRef}
              buttonPosition={Alignments.center}
              titleFontStyle={fontWeights.h500}
              buttonstyle={{marginRight: 12 * widthRef}}
            />
          </View>
          <FlatList
            data={[
              {
                text:
                  '(' +
                  DetailPlanData.numberPostsAllowed +
                  ') job posts are allowed',
                provided: true,
              },
              {
                text:
                  'Show drivers profile without posting jobs (' +
                  DetailPlanData.numberProfilesAllowed +
                  ')',
                provided: true,
              },
              {
                text: 'Show compatible drivers according to posted jobs',
                provided: true,
              },
              {
                text: 'Internal notes for interviews',
                provided: true,
              },
              {
                text: 'Video meeting for driver interviews',
                provided: true,
              },
              {
                text:
                  'A maximum number of applicants can apply for a job post (' +
                  DetailPlanData.numberApplicantsAllowed +
                  ')',
                provided: true,
              },
            ]}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            style={{
              width: fullWidth,
            }}
            ListFooterComponent={<View style={{height: 20}} />}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={item.text}
                disabled
                style={{
                  // height: 130 * heightRef,
                  width: fullWidth - 20 * heightRef,
                  backgroundColor: colors.background,
                  alignSelf: 'center',
                  marginRight: 20 * widthRef,
                  borderRadius: 5 * heightRef,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: item.provided ? colors.primary : '#EBEBEB',
                    height: 25 * heightRef,
                    width: 25 * heightRef,
                    borderRadius: 20 * heightRef,
                    margin: 10 * heightRef,
                  }}>
                  <Icon
                    onPress={() => setDetailPlan(false)}
                    name={item.provided ? 'check' : 'close'}
                    type={IconType.AntDesign}
                    size={15 * heightRef}
                    color={item.provided ? colors.background : colors.grey250}
                  />
                </View>
                <Text
                  style={{
                    marginTop: 13 * heightRef,
                    fontWeight: fontWeights.h400,
                    fontSize: fontSizes.f14,
                    width: '90%',
                    color: colors.black,
                  }}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />

          {DetailPlanData.stripeProductId ==
          companyPlan?.items?.data?.[0]?.plan.product ? (
            <View style={{marginVertical: 25 * heightRef}}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 10,
                  fontWeight: fontWeights.h600,
                  fontSize: fontSizes.f18,
                }}>
                Ad-ons:{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 0.9 * fullWidth,
                  alignItems: 'center',
                  marginBottom: 10 * heightRef,
                }}>
                <View>
                  <TextInput
                    label="Addtional Job"
                    value={additionalJobs}
                    onChangeText={text => {
                      setAdditionalJobs(text);
                    }}
                    mode="outlined"
                    style={[
                      styles.input,
                      {height: 54 * heightRef, color: colors.primary},
                    ]}
                    activeOutlineColor={colors.primary}
                    outlineColor={colors.darkGray}
                    outlineStyle={{borderWidth: 2}}
                    maxLength={120}
                    keyboardType={keyboardTypes.numeric}
                  />
                  <Text
                    style={{
                      marginLeft: 20 * heightRef,
                      color: '#6B7280',
                      fontSize: fontSizes.f12,
                      marginTop: 2 * heightRef,
                    }}>
                    {'*1 job = €' + additionalJobsAdson?.price || 0}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    dispatch(
                      getStripe(
                        {
                          successUrl:
                            'https://dev.tirminator.com/payment/payment-success',
                          cancelUrl:
                            'https://dev.tirminator.com/payment/payment-failed',
                          priceId: additionalJobsAdson.stripePriceId,
                          mode: 'payment',
                          allowPromotionCodes: false,
                          userId: profile._id,
                          quantity: additionalJobs,
                          isAddon: true,
                        },
                        (success, msg) => {
                          if (success) {
                            console.log('41: Success');
                            setDetailPlan(false);
                            navigation.navigate('StripeScreen', {
                              url: msg,
                              priceId: additionalJobsAdson.stripePriceId,
                            });
                          } else {
                            console.log('Image', msg);
                          }
                          return true;
                        },
                      ),
                    );
                  }}
                  buttonText={'Buy'}
                  buttonHeight={38 * heightRef}
                  buttonWidth={0.18 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  // isLoading={loader}
                  buttonCorners={8 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{marginBottom: 12 * widthRef}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 0.9 * fullWidth,
                  alignItems: 'center',
                  marginBottom: 10 * heightRef,
                }}>
                <View>
                  <TextInput
                    label="Driver profile"
                    value={driverProfiles}
                    onChangeText={text => {
                      setDriverProfiles(text);
                    }}
                    mode="outlined"
                    style={[
                      styles.input,
                      {height: 54 * heightRef, color: colors.primary},
                    ]}
                    activeOutlineColor={colors.primary}
                    outlineColor={colors.darkGray}
                    outlineStyle={{borderWidth: 2}}
                    maxLength={120}
                    keyboardType={keyboardTypes.numeric}
                  />
                  <Text
                    style={{
                      marginLeft: 20 * heightRef,
                      color: '#6B7280',
                      fontSize: fontSizes.f12,
                      marginTop: 2 * heightRef,
                    }}>
                    {'*1 contact info = €' + driverProfilesAdsOn?.price || 0}
                  </Text>
                </View>
                <Button
                  onPress={() => {
                    dispatch(
                      getStripe(
                        {
                          successUrl:
                            'https://dev.tirminator.com/payment/payment-success',
                          cancelUrl:
                            'https://dev.tirminator.com/payment/payment-failed',
                          priceId: driverProfilesAdsOn.stripePriceId,
                          mode: 'payment',
                          allowPromotionCodes: false,
                          userId: profile._id,
                          quantity: driverProfiles,
                          isAddon: true,
                        },
                        (success, msg) => {
                          if (success) {
                            console.log('41: Success');
                            setDetailPlan(false);
                            navigation.navigate('StripeScreen', {
                              url: msg,
                              priceId: driverProfilesAdsOn.stripePriceId,
                            });
                          } else {
                            console.log('Image', msg);
                          }
                          return true;
                        },
                      ),
                    );
                  }}
                  buttonText={'Buy'}
                  buttonHeight={38 * heightRef}
                  buttonWidth={0.18 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  // isLoading={loader}
                  buttonCorners={8 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{marginBottom: 12 * widthRef}}
                />
              </View>
            </View>
          ) : null}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BuySubscriptionScreen;
