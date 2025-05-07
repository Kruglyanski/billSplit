import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import {LoginScreen} from '../auth/LoginScreen';
import {RegisterScreen} from '../auth/RegisterScreen';
import {HomeScreen} from '../screens/Home/HomeScreen';
import authStore from '../stores/authStore';
import {RootStackParamList} from './types';
import {AddExpenseScreen} from '../screens/AddExpense/AddExpenseScreen';
import {CreateGroupScreen} from '../screens/CreateGroup/CreateGroupScreen';
import {GroupDetailsScreen} from '../screens/GroupDetails/GroupDetailsScreen';
import {GroupListScreen} from '../screens/GroupList/GroupListScreen';
import ExpenseDetailsScreen from '../screens/ExpenseDetails/ExpenseDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = observer(() => {
  if (authStore.loading) return null;

  return (
    <NavigationContainer>
      {authStore.user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
          <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
          <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
          <Stack.Screen name="GroupList" component={GroupListScreen} />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetailsScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
});

export default AppNavigator;
