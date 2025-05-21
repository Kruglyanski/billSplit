import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {AuthScreen} from '../screens/Auth/AuthScreen';
import {HomeScreen} from '../screens/Home/HomeScreen';
import authStore from '../stores/authStore';
import {RootStackParamList} from './types';
import {AddExpenseScreen} from '../screens/AddExpense/AddExpenseScreen';
import {CreateGroupScreen} from '../screens/CreateGroup/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/GroupDetails/GroupDetailsScreen';
import {GroupListScreen} from '../screens/GroupList/GroupListScreen';
import {ExpenseDetailsScreen} from '../screens/ExpenseDetails/ExpenseDetailsScreen';
import {EditExpenseScreen} from '../screens/EditExpense/EditExpenseScreen';
import {ExpenseHistoryScreen} from '../screens/ExpenseHistory/ExpenseHistoryScreen';
import {GroupBalanceScreen} from '../screens/GroupBalance/GroupBalanceScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = observer(() => {
  if (authStore.loading) return null; //TODO: сделать сплеш

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={authStore.user ? 'Home' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen name="GroupList" component={GroupListScreen} />
        <Stack.Screen name="GroupBalance" component={GroupBalanceScreen} />
        <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
        <Stack.Screen name="ExpenseHistory" component={ExpenseHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
