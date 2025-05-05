import React, {FC, useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import authStore from '../stores/authStore';
import {RegisterScreenNavigationProps} from '../navigation/types';

interface IProps {
  navigation: RegisterScreenNavigationProps;
}

export const RegisterScreen: FC<IProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await authStore.register(name, email, password);
    } catch (e: any) {
      Alert.alert(
        'Ошибка',
        e.response?.data?.message || 'Не удалось зарегистрироваться',
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
      <Button
        title="Уже есть аккаунт? Войти"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
});
