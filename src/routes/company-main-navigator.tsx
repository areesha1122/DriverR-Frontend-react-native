import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DummyScreen from 'src/screens/dummy-screen';
import DriverDashboardScreen from 'src/screens/Driver/driverHome-screens/dashboard-screen';
import DriverJobsScreen from 'src/screens/Driver/driverHome-screens/jobs-screen';
import CompanyDetailScreen from 'src/screens/Driver/driverHome-screens/topCompany-screen';
import JobDetailScreen from 'src/screens/Company/jobsPosts-screen/jobDetail-screen';
import ViewProfileScreen from 'src/screens/Company/sideMenu-screens/viewProfile-screen';
import EditProfileScreen from 'src/screens/Driver/sideMenu-screens/viewProfile-screen/editProfile-screen';
import ChangePasswordScreen from 'src/screens/Company/sideMenu-screens/settings-screens/changePassword-screen';
import PrivacyPolicyScreen from 'src/screens/Driver/sideMenu-screens/privacyPolicy-screen';
import SettingsScreen from 'src/screens/Driver/sideMenu-screens/settings-screens';
import SelectLanguageScreen from 'src/screens/Company/sideMenu-screens/settings-screens/selectLanguage-screen';

import MyDrawer from './company-sideMenu';
import PersonalInfoStep3Screen from 'src/screens/Driver/completeProfile-screen/step3-screen';

import ProfileVerificationScreen from 'src/screens/Company/completeProfile-screen/profile-verification-screen';
import CompanyEditProfileScreen from 'src/screens/Company/sideMenu-screens/viewProfile-screen/editProfile-screen';
import CompleteProfileScreen from 'src/screens/auth-screens/complete-screen';
import {useSelector} from 'react-redux';
import {getIsNewCompany, getProfile} from 'src/redux/auth/authSelector';
import DriverListScreen from 'src/screens/Company/diverList-screen';
import CompanyHomeScreen from 'src/screens/Company/home-screen';
import JobsPostsScreen from 'src/screens/Company/jobsPosts-screen';
import TabNavigator from './company-tab-navigator';
import AddJobPostScreen from 'src/screens/Company/jobsPosts-screen/addJobPost-screen';
import EditJobPostScreen from 'src/screens/Company/jobsPosts-screen/editJobPost-screen';
import AddFeedbackScreen from 'src/screens/Company/jobsPosts-screen/addFeedBack-screen';
import CompanyMessagesScreen from 'src/screens/Company/message-screens';
import CompanyChatScreen from 'src/screens/Company/message-screens/chat-screen';
import SupportTicketsScreen from 'src/screens/Company/customerSupport-screens/supportTickets-screen';
import TicketDetailScreen from 'src/screens/Company/customerSupport-screens/ticketDetail-screen';
import TicketChatScreen from 'src/screens/Company/customerSupport-screens/ticketChat-screen';
import BuySubscriptionScreen from 'src/screens/Company/subscriptionPlans-screens/buySubscription-screen';
import FaqScreen from 'src/screens/Company/faq-screen';
import BlockedDriversScreen from 'src/screens/Company/message-screens/bocklist-screen';
import NewTicketScreen from 'src/screens/Company/customerSupport-screens/newTicket-screen';
import StripeScreen from 'src/screens/Company/stripe-screen';
import SelectLocationScreen from 'src/screens/Company/sideMenu-screens/settings-screens/selectLocation-screen';
import CompanyNotificationScreen from 'src/screens/Company/notification-screen';
import CompanyChatIntializerScreen from 'src/screens/Company/message-screens/chat-intializer-screen';
import CompanyInfoStep1Screen from 'src/screens/Company/completeProfile-screen/step1Rejected-screen';
import CompanyInfoStep2Screen from 'src/screens/Company/completeProfile-screen/step2Rejected-screen';
import ViewImgScreen from 'src/screens/Company/diverList-screen/ViewImage';

const Stack = createStackNavigator();

function CompanyMainNavigator() {
  const profile = useSelector(getProfile);
  const isNewProfile = useSelector(getIsNewCompany);
  console.log('====>', isNewProfile);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'ProfileVerificationScreen'}>
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverDashboardScreen"
          component={DriverDashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverJobsScreenn"
          component={DriverJobsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyDetailScreen"
          component={CompanyDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetailScreen"
          component={JobDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewProfileScreen"
          component={ViewProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyEditProfileScreen"
          component={CompanyEditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLanguageScreen"
          component={SelectLanguageScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PersonalInfoStep3Screen"
          component={PersonalInfoStep3Screen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileVerificationScreen"
          component={ProfileVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverListScreen"
          component={DriverListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyHomeScreen"
          component={CompanyHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobsPostsScreen"
          component={JobsPostsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddJobPostScreen"
          component={AddJobPostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditJobPostScreen"
          component={EditJobPostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddFeedbackScreen"
          component={AddFeedbackScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyMessagesScreen"
          component={CompanyMessagesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyChatScreen"
          component={CompanyChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SupportTicketsScreen"
          component={SupportTicketsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TicketDetailScreen"
          component={TicketDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TicketChatScreen"
          component={TicketChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewTicketScreen"
          component={NewTicketScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuySubscriptionScreen"
          component={BuySubscriptionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaqScreen"
          component={FaqScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewImgScreen"
          component={ViewImgScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlockedDriversScreen"
          component={BlockedDriversScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StripeScreen"
          component={StripeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLocationScreen"
          component={SelectLocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyNotificationScreen"
          component={CompanyNotificationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CompanyChatIntializerScreen"
          component={CompanyChatIntializerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyInfoStep1Screen"
          component={CompanyInfoStep1Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyInfoStep2Screen"
          component={CompanyInfoStep2Screen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CompanyMainNavigator;
