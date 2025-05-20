import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum EExpenseActionType {
  EDIT = 'edit',
  CREATE = 'create',
}

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  CreateGroup: undefined;
  GroupList: undefined;
  AddExpense: {groupId?: number; actionType: EExpenseActionType};
  GroupDetails: {groupId: number};
  GroupBalance: {groupId: number};
  ExpenseDetails: {expenseId: number};
  EditExpense: {expenseId: number};
  ExpenseHistory: {expenseId: number};
};

export type HomeScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type LoginScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
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

export type ExpenseDetailsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ExpenseDetails'
>;

export type EditExpenseScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'EditExpense'
>;
export type ExpenseHistoryScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ExpenseHistory'
>;

export type GroupBalanceScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'GroupBalance'
>;
