import React, {FC, useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import authStore from '../stores/authStore';
import {LoginScreenNavigationProps} from '../navigation/types';

interface IProps {
  navigation: LoginScreenNavigationProps;
}

export const LoginScreen: FC<IProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await authStore.login(email, password);
    } catch (e: any) {
      Alert.alert('Ошибка', e.response?.data?.message || 'Что-то пошло не так');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Войти" onPress={handleLogin} />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
