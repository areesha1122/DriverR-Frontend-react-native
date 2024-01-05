import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DummyScreen from 'src/screens/dummy-screen';
import DriverDashboardScreen from 'src/screens/Driver/driverHome-screens/dashboard-screen';
import DriverJobsScreen from 'src/screens/Driver/driverHome-screens/jobs-screen';
import CompanyDetailScreen from 'src/screens/Driver/driverHome-screens/topCompany-screen';
import JobDetailScreen from 'src/screens/Driver/driverHome-screens/jobDetail-screen';
import ViewProfileScreen from 'src/screens/Driver/sideMenu-screens/viewProfile-screen';
import EditProfileScreen from 'src/screens/Driver/sideMenu-screens/viewProfile-screen/editProfile-screen';
import ChangePasswordScreen from 'src/screens/Driver/sideMenu-screens/settings-screens/changePassword-screen';
import PrivacyPolicyScreen from 'src/screens/Driver/sideMenu-screens/privacyPolicy-screen';
import SettingsScreen from 'src/screens/Driver/sideMenu-screens/settings-screens';
import SelectLanguageScreen from 'src/screens/Driver/sideMenu-screens/settings-screens/selectLanguage-screen';
import TabNavigator from './driver-tab-navigator';
import MyDrawer from './driver-sideMenu';
import PersonalInfoStep1Screen from 'src/screens/Driver/completeProfile-screen/step1-screen';
import PersonalInfoStep2Screen from 'src/screens/Driver/completeProfile-screen/step2-screen';
import PersonalInfoStep3Screen from 'src/screens/Driver/completeProfile-screen/step3-screen';
import CompleteProfileScreen from 'src/screens/auth-screens/complete-screen';
import {useSelector} from 'react-redux';
import {getProfile} from 'src/redux/auth/authSelector';
import RecommendedJobListScreen from 'src/screens/Driver/recommendedJobs-screen';
import DriverMessagesScreen from 'src/screens/Driver/message-screens';
import DriverChatScreen from 'src/screens/Driver/message-screens/chat-screen';
import SupportTicketsScreen from 'src/screens/Driver/customerSupport-screens/supportTickets-screen';
import TicketDetailScreen from 'src/screens/Driver/customerSupport-screens/ticketDetail-screen';
import TicketChatScreen from 'src/screens/Driver/customerSupport-screens/ticketChat-screen';
import NewTicketScreen from 'src/screens/Driver/customerSupport-screens/newTicket-screen';
import BoardingScreen from 'src/screens/boarding-screen';
import DriverNotificationScreen from 'src/screens/Driver/notification-screen';
import ViewImgScreen from 'src/screens/Company/diverList-screen/ViewImage';
import AllCompaniesScreen from 'src/screens/Driver/allCompanies-screen';
import SelectLocationScreen from 'src/screens/Driver/sideMenu-screens/settings-screens/selectLocation-screen';

const Stack = createStackNavigator();

function MainNavigator() {
  const profile = useSelector(getProfile);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={profile ? 'MyDrawer' : 'CompleteProfileScreen'}>
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BoardingScreen"
          component={BoardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecommendedJobListScreen"
          component={RecommendedJobListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverMessagesScreen"
          component={DriverMessagesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverChatScreen"
          component={DriverChatScreen}
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
          name="SelectLocationScreen"
          component={SelectLocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewProfileScreen"
          component={ViewProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
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
          name="PersonalInfoStep1Screen"
          component={PersonalInfoStep1Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalInfoStep2Screen"
          component={PersonalInfoStep2Screen}
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
          name="DriverNotificationScreen"
          component={DriverNotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewImgScreen"
          component={ViewImgScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllCompaniesScreen"
          component={AllCompaniesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
