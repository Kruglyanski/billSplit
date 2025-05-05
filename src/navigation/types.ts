import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;