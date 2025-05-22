import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export enum EExpenseActionType {
  EDIT = 'edit',
  CREATE = 'create',
}

export type RootStackParamList = {
  Auth: undefined;
  Tabs: NavigatorScreenParams<TabsParamList>;
};

export type TabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  GroupListTab: NavigatorScreenParams<GroupStackParamList>;
  ExpenseHistoryTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  AddExpense: {
    groupId?: number;
    expenseId?: number;
    actionType: EExpenseActionType;
  };
  ExpenseDetails: {expenseId: number};
  CreateGroup: undefined;
};

export type GroupStackParamList = {
  GroupList: undefined;
  GroupBalance: {groupId: number};
  CreateGroup: undefined;
  AddExpense: {
    groupId?: number;
    expenseId?: number;
    actionType: EExpenseActionType;
  };
  GroupDetails: {groupId: number};
  ExpenseDetails: {expenseId: number};
  EditExpense: {expenseId: number};
};

export type LoginScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;

export type TabsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
>;

export type GroupListScreenNavigationProps = BottomTabScreenProps<
  TabsParamList,
  'GroupListTab'
>;

export type ExpenseHistoryScreenNavigationProps = BottomTabScreenProps<
  TabsParamList,
  'ExpenseHistoryTab'
>;

export type GroupBalanceScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupBalance'
>;

export type CreateGroupScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'CreateGroup'
>;

export type AddExpenseScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'AddExpense'
>;

export type GroupDetailsScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupDetails'
>;

export type ExpenseDetailsScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'ExpenseDetails'
>;

export type EditExpenseScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'EditExpense'
>;

export type HomeScreenNavigationProps = BottomTabScreenProps<
  TabsParamList,
  'HomeTab'
>;
