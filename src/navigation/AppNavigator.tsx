import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import {AuthScreen} from '../screens/Auth/AuthScreen';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {GroupListScreen} from '../screens/GroupList/GroupListScreen';
import {GroupBalanceScreen} from '../screens/GroupBalance/GroupBalanceScreen';
import authStore from '../stores/authStore';
import {
  GroupStackParamList,
  HomeStackParamList,
  RootStackParamList,
} from './types';
import {AddExpenseScreen} from '../screens/AddExpense/AddExpenseScreen';
import {CreateGroupScreen} from '../screens/CreateGroup/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/GroupDetails/GroupDetailsScreen';
import {ExpenseDetailsScreen} from '../screens/ExpenseDetails/ExpenseDetailsScreen';
import {ExpenseHistoryScreen} from '../screens/ExpenseHistory/ExpenseHistoryScreen';
import {Icon} from 'react-native-paper';
import {colors} from '../theme/colors';
import {customTypeScale} from '../theme/typography';
import {useTranslation} from 'react-i18next';
import {EditExpenseScreen} from '../screens/EditExpense/EditExpenseScreen';
import {ConfirmEmailScreen} from '../screens/ConfirmEmail/ConfirmEmailScreen';
import {setNavigator} from '../utils/services/deeplinkService';
import {ProfileScreen} from '../screens/Profile/ProfileScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const GroupStack = createNativeStackNavigator<GroupStackParamList>();

const GroupListStackNavigator = () => {
  return (
    <GroupStack.Navigator screenOptions={{headerShown: false}}>
      <GroupStack.Screen name="GroupList" component={GroupListScreen} />
      <GroupStack.Screen name="AddExpense" component={AddExpenseScreen} />
      <GroupStack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <GroupStack.Screen name="GroupDetails" component={GroupDetailsScreen} />
      <GroupStack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
      />
      <GroupStack.Screen name="GroupBalance" component={GroupBalanceScreen} />
    </GroupStack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AddExpense" component={AddExpenseScreen} />
      <HomeStack.Screen name="EditExpense" component={EditExpenseScreen} />
      <HomeStack.Screen
        name="ExpenseDetails"
        component={ExpenseDetailsScreen}
      />
    </HomeStack.Navigator>
  );
};

const Tabs = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName: string = 'home';

          if (route.name === 'HomeTab') iconName = 'home';
          if (route.name === 'GroupListTab') iconName = 'account-group';
          if (route.name === 'ExpenseHistoryTab') iconName = 'history';
          if (route.name === 'ProfileTab') iconName = 'face-man';

          return <Icon source={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: colors.darkMain,
          borderTopWidth: 1,
          borderTopColor: colors.darkGray,
          height: 60,
        },
        tabBarActiveTintColor: colors.gray,
        tabBarInactiveTintColor: colors.lightMain,
        tabBarLabelStyle: {
          ...customTypeScale.bodyMedium,
        },
        tabBarItemStyle: {
          padding: 4,
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{title: t('tab.home')}}
      />
      <Tab.Screen
        name="GroupListTab"
        component={GroupListStackNavigator}
        options={{title: t('tab.events')}}
      />
      <Tab.Screen
        name="ExpenseHistoryTab"
        component={ExpenseHistoryScreen}
        options={{title: t('tab.history')}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{title: t('tab.profile')}}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = observer(() => {
  if (authStore.isLoading) return null;

  return (
    <NavigationContainer ref={setNavigator}>
      <RootStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={authStore.user ? 'Tabs' : 'Auth'}>
        <RootStack.Screen name="Auth" component={AuthScreen} />
        <RootStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <RootStack.Screen name="Tabs" component={Tabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
