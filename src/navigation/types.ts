import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  CreateGroup: undefined;
  GroupList: undefined;
  AddExpense: {groupId: number};
  GroupDetails: {groupId: number};
};

export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type RegisterScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type LoginScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type AddExpenseScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'AddExpense'
>;

export type GroupDetailScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'GroupDetails'
>;

export type CreateGroupScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateGroup'
>;

export type GroupListScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'GroupList'
>;
