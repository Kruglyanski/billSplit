import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Tabs:
    | {
        screen?: keyof TabsParamList;
        params?: NavigatorScreenParams<TabsParamList>;
      }
    | undefined;
};

export type TabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  GroupListTab: NavigatorScreenParams<GroupStackParamList>;
  ExpenseHistoryTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  AddExpense: TAddExpense;
  EditExpense: TEditExpense;
  ExpenseDetails: TExpenseDetails;
  // CreateGroup: TCreateGroup;
};

type TAddExpense = {
  groupId?: number;
};

type TExpenseDetails = {
  expenseId: number;
};

type TEditExpense = {
  expenseId: number;
};

type TCreateGroup = undefined;

export type GroupStackParamList = {
  AddExpense: TAddExpense;
  ExpenseDetails: TExpenseDetails;
  EditExpense: {expenseId: number};
  GroupList: undefined;
  GroupDetails: {groupId: number};
  GroupBalance: {groupId: number};
  CreateGroup: TCreateGroup;
};

export type AuthScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;

export type TabsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Tabs'
>;

export type HomeScreenNavigationProps = BottomTabScreenProps<
  TabsParamList,
  'HomeTab'
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

export type GroupDetailsScreenNavigationProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupDetails'
>;

export type CreateGroupScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList & GroupStackParamList,
  'CreateGroup'
>;

export type ExpenseDetailsScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList & GroupStackParamList,
  'ExpenseDetails'
>;

export type AddExpenseScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList & GroupStackParamList,
  'AddExpense'
>;

export type EditExpenseScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList & GroupStackParamList,
  'EditExpense'
>;
